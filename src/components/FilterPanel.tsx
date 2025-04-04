import { ChevronDown, ChevronUp, Filter, RefreshCw } from "lucide-react";
import React, { useState } from "react";
import { FilterOptions } from "../hooks/useGitHubIssues";
import TechBadges from "./TechBadges";

interface FilterPanelProps {
  filters: FilterOptions;
  setFilter: (key: keyof FilterOptions, value: string | number) => void;
  applyFilters: () => Promise<void>;
  isLoading: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilter,
  applyFilters,
  isLoading,
}) => {
  const [expanded, setExpanded] = useState(false);

  const popularRepos = [
    { name: "api", display: "API" },
    { name: "dashboard", display: "Dashboard / Web UI" },
    { name: "infra", display: "Infrastructure" },
  ];

  const languages = [
    { value: "", display: "Any Language" },
    { value: "javascript", display: "JavaScript" },
    { value: "typescript", display: "TypeScript" },
    { value: "python", display: "Python" },
    { value: "rust", display: "Rust" },
    { value: "go", display: "Go" },
    { value: "java", display: "Java" },
  ];

  const sortOptions = [
    { value: "updated", display: "Last Updated" },
    { value: "created", display: "Newest First" },
    { value: "comments", display: "Most Commented" },
  ];

  const handleApplyFilters = async (e: React.FormEvent) => {
    e.preventDefault();
    await applyFilters();
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
      {/* Header with toggle */}
      <div
        className="bg-[#f0f5f5] p-3 flex justify-between items-center cursor-pointer border-b border-[#e0eaea]"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-[#1aa6b8] mr-2" />
          <h3 className="font-medium text-[#55625c]">Filter Issues</h3>
          {filters.language && (
            <span className="ml-2 text-xs bg-[#e0eaea] px-2 py-0.5 rounded-full">
              {filters.language}
            </span>
          )}
          {filters.repo && (
            <span className="ml-2 text-xs bg-[#e0eaea] px-2 py-0.5 rounded-full">
              {filters.repo}
            </span>
          )}
        </div>
        <div className="flex items-center text-sm text-[#55625c]">
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Hide Filters
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Show Filters
            </>
          )}
        </div>
      </div>
      {/* Tech Badges (always visible) */}
      <div className="p-4 border-b border-[#e0eaea]">
        <TechBadges setFilter={setFilter} applyFilters={applyFilters} />
      </div>

      {/* Filter form */}
      {expanded && (
        <form onSubmit={handleApplyFilters} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Repository Selector */}
            <div className="space-y-2">
              <label
                htmlFor="repo"
                className="block text-sm font-medium text-[#55625c]"
              >
                Repository
              </label>
              <select
                id="repo"
                value={filters.repo || ""}
                onChange={(e) => setFilter("repo", e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md text-[#55625c] focus:ring-2 focus:ring-[#1aa6b8] focus:border-transparent"
              >
                <option value="">All Repositories</option>
                {popularRepos.map((repo) => (
                  <option key={repo.name} value={repo.name}>
                    {repo.display}
                  </option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label
                htmlFor="language"
                className="block text-sm font-medium text-[#55625c]"
              >
                Language
              </label>
              <select
                id="language"
                value={filters.language || ""}
                onChange={(e) => setFilter("language", e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md text-[#55625c] focus:ring-2 focus:ring-[#1aa6b8] focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.display}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <label
                htmlFor="sort"
                className="block text-sm font-medium text-[#55625c]"
              >
                Sort By
              </label>
              <select
                id="sort"
                value={filters.sort}
                onChange={(e) =>
                  setFilter(
                    "sort",
                    e.target.value as "updated" | "created" | "comments"
                  )
                }
                className="w-full p-2 border border-gray-200 rounded-md text-[#55625c] focus:ring-2 focus:ring-[#1aa6b8] focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.display}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setFilter("org", "phish-directory");
                setFilter("label", "issue-board");
                setFilter("language", "");
                setFilter("repo", "");
                setFilter("state", "open");
                setFilter("sort", "updated");
                applyFilters();
              }}
              className="flex items-center px-3 py-1.5 mr-2 bg-[#f0f0f0] text-[#55625c] rounded-md hover:bg-[#e0e0e0]"
            >
              Reset Filters
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-[#1aa6b8] text-white rounded-md hover:bg-[#158c9c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1aa6b8] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FilterPanel;
