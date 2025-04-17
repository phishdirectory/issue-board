
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

  // Group issues by repository
  const issuesByRepo: Record<string, Issue[]> = {};
  
  issues.forEach(issue => {
    // Extract repo name from URL: https://github.com/phishdirectory/repo-name/issues/123
    const urlParts = issue.html_url.split('/');
    const repoIndex = urlParts.findIndex(part => part === 'phishdirectory') + 1;
    const repoName = repoIndex < urlParts.length ? urlParts[repoIndex] : 'Unknown';
    
    if (!issuesByRepo[repoName]) {
      issuesByRepo[repoName] = [];
    }
    issuesByRepo[repoName].push(issue);
  });

  return (
    <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-2 px-2">
        <h2 className="text-xl font-semibold text-[#55625c] flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#1aa6b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Available Issues ({issues.length})
        </h2>
        <div className="text-sm text-[#55625c]">
          <span className="bg-[#f0f5f5] px-2 py-1 rounded">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="space-y-8">
        {Object.entries(issuesByRepo).map(([repoName, repoIssues]) => (
          <div key={repoName} className="space-y-4">
            <h3 className="text-lg font-medium text-[#55625c] bg-[#f0f5f5] p-2 rounded-lg">
              {repoName} <span className="text-sm font-normal">({repoIssues.length} issues)</span>
            </h3>
            <div className="space-y-4">
              {repoIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueList;
