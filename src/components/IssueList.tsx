
import React from 'react';
import IssueCard, { Issue } from './IssueCard';

interface IssueListProps {
  issues: Issue[];
}

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  if (!issues.length) {
    return (
      <div className="text-center p-8 bg-white shadow rounded-lg">
        <svg className="mx-auto h-12 w-12 text-[#83bab4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-[#55625c]">No issues found</h3>
        <p className="mt-1 text-sm text-[#55625c]">Try refreshing or check if the repository has issues with the "issue-board" label.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 max-w-5xl mx-auto">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
};

export default IssueList;
