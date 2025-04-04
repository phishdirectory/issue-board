
import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (org: string, label: string, token?: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [org] = useState('phish-directory');
  const [label] = useState('issue-board');
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (org && label) {
      onSearch(org, label, token);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="org" className="block text-sm font-medium text-[#55625c] mb-1">
            GitHub Organization
          </label>
          <input
            id="org"
            type="text"
            value={org}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="label" className="block text-sm font-medium text-[#55625c] mb-1">
            Issue Label
          </label>
          <input
            id="label"
            type="text"
            value={label}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="token" className="block text-sm font-medium text-[#55625c] mb-1">
          GitHub Personal Access Token (optional, increases API rate limit)
        </label>
        <input
          id="token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ghp_..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#1aa6b8] focus:border-[#1aa6b8]"
        />
        <p className="mt-1 text-xs text-gray-500">
          For private repositories or to increase rate limits, add a token with repo scope.
        </p>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium 
                  ${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#1aa6b8] hover:bg-[#83bab4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#83bab4]'}`}
      >
        {isLoading ? 'Loading...' : 'Refresh Issues'}
      </button>
    </form>
  );
};

export default SearchForm;
