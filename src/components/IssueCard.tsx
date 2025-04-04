import { ExternalLink, MessageCircle } from "lucide-react";
import React from "react";

interface Label {
  name: string;
  color: string;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  state: string;
  comments: number;
  body: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  labels: Label[];
}

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get a readable excerpt from the issue body
  const getBodyExcerpt = (body: string) => {
    if (!body) return "";
    return body.length > 150 ? `${body.substring(0, 150)}...` : body;
  };

  // Function to get contrasting text color based on background color
  const getContrastText = (hexColor: string) => {
    // Remove # if present
    hexColor = hexColor.replace("#", "");

    // Convert hex to RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="border-l-4 border-[#1aa6b8]">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <a
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-[#1aa6b8] hover:text-[#55625c] hover:underline flex items-center gap-1 transition-colors duration-200"
            >
              <span className="bg-[#f0f5f5] text-[#55625c] px-1.5 py-0.5 rounded text-xs font-mono mr-1">
                #{issue.number}
              </span>
              {issue.title}
              <ExternalLink size={16} className="inline ml-1 opacity-70" />
            </a>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {issue.labels.map((label) => (
              <span
                key={label.name}
                className="inline-block px-2 py-0.5 rounded-full text-xs font-medium transition-transform hover:scale-105"
                style={{
                  backgroundColor: `#${label.color}`,
                  color: getContrastText(label.color),
                }}
              >
                {label.name}
              </span>
            ))}
          </div>

          <p className="text-[#55625c] text-sm mb-4 bg-[#f9f9f8] p-3 rounded-md border border-gray-100">
            {getBodyExcerpt(issue.body)}
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-[#55625c] mt-3 pt-3 border-t border-gray-100 gap-2">
            <div className="flex items-center gap-2">
              <img
                src={issue.user.avatar_url}
                alt={issue.user.login}
                className="w-6 h-6 rounded-full border border-gray-200"
              />
              <a
                href={issue.user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1aa6b8] hover:underline transition-colors duration-200"
              >
                Author: @{issue.user.login}
              </a>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <span
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                  issue.state === "open"
                    ? "bg-[#e6f7f5] text-[#2da096]"
                    : "bg-[#f5efe9] text-[#bf8a6a]"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    issue.state === "open" ? "bg-[#2da096]" : "bg-[#bf8a6a]"
                  }`}
                ></span>
                {issue.state}
              </span>

              <span className="flex items-center gap-1 bg-[#f5f3f0] px-2 py-0.5 rounded-full">
                <MessageCircle size={12} />
                {issue.comments}
              </span>

              <span className="text-[#55625c] opacity-80">
                Updated {formatDate(issue.updated_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
