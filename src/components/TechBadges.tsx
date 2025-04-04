import React from "react";
import { FilterOptions } from "../hooks/useGitHubIssues";

interface TechBadgesProps {
  setFilter: (key: keyof FilterOptions, value: string) => void;
  applyFilters: () => Promise<void>;
}

interface TechBadge {
  name: string;
  displayName: string;
  color: string;
  textColor: string;
}

const TechBadges: React.FC<TechBadgesProps> = ({ setFilter, applyFilters }) => {
  const techStacks: TechBadge[] = [
    {
      name: "javascript",
      displayName: "JavaScript",
      color: "#f7df1e",
      textColor: "#000000",
    },
    {
      name: "typescript",
      displayName: "TypeScript",
      color: "#3178c6",
      textColor: "#ffffff",
    },
    {
      name: "react",
      displayName: "React",
      color: "#61dafb",
      textColor: "#000000",
    },
    { name: "vue", displayName: "Vue", color: "#42b883", textColor: "#ffffff" },
    {
      name: "python",
      displayName: "Python",
      color: "#3776ab",
      textColor: "#ffffff",
    },
    {
      name: "rust",
      displayName: "Rust",
      color: "#dea584",
      textColor: "#000000",
    },
    { name: "go", displayName: "Go", color: "#00add8", textColor: "#ffffff" },
    {
      name: "java",
      displayName: "Java",
      color: "#b07219",
      textColor: "#ffffff",
    },
    {
      name: "swift",
      displayName: "Swift",
      color: "#f05138",
      textColor: "#ffffff",
    },
    {
      name: "docker",
      displayName: "Docker",
      color: "#2496ed",
      textColor: "#ffffff",
    },
  ];

  const handleClick = async (language: string) => {
    setFilter("language", language);
    await applyFilters();
  };

  return (
    <div className="my-4">
      <h3 className="text-sm font-medium text-[#55625c] mb-2">
        Quick Filters by Technology:
      </h3>
      <div className="flex flex-wrap gap-2">
        {techStacks.map((tech) => (
          <button
            key={tech.name}
            onClick={() => handleClick(tech.name)}
            className="px-3 py-1 rounded-full text-xs font-medium transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
            style={{
              backgroundColor: tech.color,
              color: tech.textColor,
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            {tech.displayName}
          </button>
        ))}
        <button
          onClick={() => handleClick("")}
          className="px-3 py-1 rounded-full text-xs font-medium bg-[#f0f0f0] text-[#55625c] transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
          style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default TechBadges;
