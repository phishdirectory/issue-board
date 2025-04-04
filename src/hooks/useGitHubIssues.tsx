
import { useState, useEffect } from 'react';
import { Issue } from '../components/IssueCard';
import { toast } from 'sonner';

interface UseGitHubIssuesReturn {
  issues: Issue[];
  loading: boolean;
  error: string | null;
  fetchIssues: (org: string, label: string, token?: string) => Promise<void>;
}

export function useGitHubIssues(): UseGitHubIssuesReturn {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchIssues(org: string, label: string, token?: string): Promise<void> {
    setLoading(true);
    setError(null);
    setIssues([]);

    try {
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json'
      };

      if (token) {
        headers['Authorization'] = `token ${token}`;
      }

      const response = await fetch(
        `https://api.github.com/search/issues?q=label:"${encodeURIComponent(label)}"+org:${encodeURIComponent(org)}+state:open&sort=updated&order=desc&per_page=30`,
        { headers }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('API rate limit exceeded. Please add a GitHub token to increase your limit.');
        }
        if (response.status === 401) {
          throw new Error('Invalid GitHub token. Please check your token and try again.');
        }
        if (response.status === 404) {
          throw new Error('Organization not found. Please check the organization name.');
        }

        const errorData = await response.json();
        throw new Error(errorData.message || `GitHub API returned ${response.status}`);
      }

      const data = await response.json();
      setIssues(data.items || []);
      
      toast.success(`Found ${data.items.length} issues with label "${label}" in ${org}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return { issues, loading, error, fetchIssues };
}
