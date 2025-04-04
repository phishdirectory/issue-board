
import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import IssueList from '../components/IssueList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useGitHubIssues } from '../hooks/useGitHubIssues';

const Index = () => {
  const { issues, loading, error, fetchIssues } = useGitHubIssues();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">GitHub Issue Beacon</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search for issues across GitHub repositories in a specific organization that are tagged with 
            a particular label. Enter an organization name and label below to get started.
          </p>
        </div>

        <SearchForm onSearch={fetchIssues} isLoading={loading} />
        
        {error && <ErrorMessage message={error} />}
        
        <div className="mt-8">
          {loading ? <LoadingSpinner /> : <IssueList issues={issues} />}
        </div>
      </main>

      <footer className="bg-[#0d1117] text-white p-4 text-center text-sm">
        <p>GitHub Issue Beacon &copy; {new Date().getFullYear()} - Not affiliated with GitHub</p>
      </footer>
    </div>
  );
};

export default Index;
