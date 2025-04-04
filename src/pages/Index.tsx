import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Header from "../components/Header";
import IssueList from "../components/IssueList";
import LoadingSpinner from "../components/LoadingSpinner";
import FilterPanel from "../components/FilterPanel";
import { FilterOptions, useGitHubIssues } from "../hooks/useGitHubIssues";

const Index = () => {
  const { issues, loading, error, fetchIssues, filters, setFilter, applyFilters } = useGitHubIssues();
  const [initialLoad, setInitialLoad] = useState(true);

  // Only fetch issues once when the page first loads
  useEffect(() => {
    if (initialLoad) {
      fetchIssues(filters);
      setInitialLoad(false);
    }
  }, [initialLoad, fetchIssues, filters]);

  return (
    <div className="min-h-screen bg-[#f5f3f0] flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-4xl mx-auto border-l-4 border-[#1aa6b8]">
          <h1 className="text-3xl font-bold mb-4 text-[#55625c] flex items-center">
            <span className="bg-[#83bab4] text-white p-1 rounded mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Welcome to the Issue Board!
          </h1>
          
          <div className="space-y-4 text-[#55625c]">
            <p className="text-lg">
              Here you can find a list of issues and feature requests for the
              <span className="font-semibold text-[#1aa6b8]"> phish.directory </span> 
              project that we think would be great for contributors like you to tackle.
            </p>
            
            <div className="flex items-start space-x-2 bg-[#f5f3f0] p-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#55625c] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                If you're new to open source, this is a great place to start! You
                can help us improve the project by picking an issue below and
                submitting a pull request.
              </p>
            </div>
            
            <div className="flex items-start space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1aa6b8] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <p>
                To get started, simply click on an issue to view its details. If you
                have a GitHub account, you can comment on the issue or assign it to
                yourself. Once you've made your changes, submit a pull request to
                the phish.directory repository.
              </p>
            </div>
            
            <div className="flex items-start space-x-2 bg-[#f0f5f5] p-3 rounded-md border-l-2 border-[#83bab4]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#83bab4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p>
                <strong>Note:</strong> If you don't have a GitHub account, you can
                still view issues but won't be able to comment or assign them to
                yourself. You can create a GitHub account, which we would recommend
                if you're interested in contributing to open source projects like
                this one.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel 
          filters={filters} 
          setFilter={setFilter} 
          applyFilters={applyFilters} 
          isLoading={loading} 
        />

        {error && <ErrorMessage message={error} />}

        <div className="mt-8">
          {loading ? <LoadingSpinner /> : <IssueList issues={issues} />}
        </div>
      </main>

      <footer className="bg-gradient-to-r from-[#55625c] to-[#42504a] text-white p-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg className="w-5 h-5 mr-2" fill="white" viewBox="0 0 16 16">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            <p className="text-sm">&copy; <span className="text-[#83bab4]">phish</span>.<span className="text-white">directory</span> {new Date().getFullYear()} </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://github.com/phish-directory/issue-board" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#83bab4] transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="https://twitter.com/phishdirectory" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#83bab4] transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
