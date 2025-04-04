import { useState } from "react";
import { toast } from "sonner";
import { Issue } from "../components/IssueCard";

export interface FilterOptions {
  org: string;
  label: string;
  language?: string;
  repo?: string;
  state?: "open" | "closed" | "all";
  sort?: "created" | "updated" | "comments";
  order?: "asc" | "desc";
  perPage?: number;
}

interface UseGitHubIssuesReturn {
  issues: Issue[];
  loading: boolean;
  error: string | null;
  fetchIssues: (options: FilterOptions, token?: string) => Promise<void>;
  filters: FilterOptions;
  setFilter: (key: keyof FilterOptions, value: string | number) => void;
  applyFilters: () => Promise<void>;
}

export function useGitHubIssues(): UseGitHubIssuesReturn {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    org: "phish-directory",
    label: "issue-board",
    state: "open",
    sort: "updated",
    order: "desc",
    perPage: 30
  });
  const [token, setToken] = useState<string | undefined>(undefined);

  const setFilter = (key: keyof FilterOptions, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = async () => {
    await fetchIssues(filters, token);
  };

  async function fetchIssues(
    options: FilterOptions,
    token?: string
  ): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
      };

      if (token) {
        headers["Authorization"] = `token ${token}`;
        setToken(token);
      }

      // Build the query based on filter options
      let query = `label:"${encodeURIComponent(options.label)}"+org:${encodeURIComponent(options.org)}`;
      
      // Add optional filters
      if (options.state && options.state !== "all") {
        query += `+state:${options.state}`;
      }

      if (options.language) {
        query += `+language:${encodeURIComponent(options.language)}`;
      }

      if (options.repo) {
        query += `+repo:${encodeURIComponent(options.org)}/${encodeURIComponent(options.repo)}`;
      }

      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const sort = options.sort || "updated";
      const order = options.order || "desc";
      const perPage = options.perPage || 30;

      const response = await fetch(
        `https://api.github.com/search/issues?q=${query}&sort=${sort}&order=${order}&per_page=${perPage}`,
        {
          headers,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            "API rate limit exceeded. Please add a GitHub token to increase your limit."
          );
        }
        if (response.status === 401) {
          throw new Error(
            "Invalid GitHub token. Please check your token and try again."
          );
        }
        if (response.status === 404) {
          throw new Error(
            "Organization not found. Please check the organization name."
          );
        }

        const errorData = await response.json();
        throw new Error(
          errorData.message || `GitHub API returned ${response.status}`
        );
      }

      const data = await response.json();
      setIssues(data.items || []);
      toast.success(`Found ${data.items.length} issues matching your filters`);
    } catch (err) {
      let errorMessage = "";

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errorMessage =
            "Request timed out. GitHub may be experiencing issues.";
        } else {
          errorMessage = err.message;
        }
      } else {
        errorMessage = "An unknown error occurred";
      }

      setError(errorMessage);
      toast.error(errorMessage);
      setIssues([]); // Clear issues on error
    } finally {
      setLoading(false);
    }
  }

  return { issues, loading, error, fetchIssues, filters, setFilter, applyFilters };
}
