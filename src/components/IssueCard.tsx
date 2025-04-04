
import React from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';

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
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get a readable excerpt from the issue body
  const getBodyExcerpt = (body: string) => {
    if (!body) return '';
    return body.length > 150 ? `${body.substring(0, 150)}...` : body;
  };

  // Function to get contrasting text color based on background color
  const getContrastText = (hexColor: string) => {
    // Remove # if present
    hexColor = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <a 
            href={issue.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-lg font-semibold text-[#0969da] hover:underline flex items-center gap-1"
          >
            #{issue.number} {issue.title}
            <ExternalLink size={16} className="inline" />
          </a>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {issue.labels.map((label) => (
            <span 
              key={label.name}
              className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: `#${label.color}`, 
                color: getContrastText(label.color)
              }}
            >
              {label.name}
            </span>
          ))}
        </div>

        <p className="text-gray-600 text-sm mb-4">{getBodyExcerpt(issue.body)}</p>

        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <div className="flex items-center gap-2">
            <img 
              src={issue.user.avatar_url} 
              alt={issue.user.login}
              className="w-5 h-5 rounded-full" 
            />
            <a 
              href={issue.user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0969da] hover:underline"
            >
              @{issue.user.login}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${issue.state === 'open' ? 'bg-green-500' : 'bg-purple-500'}`}></span>
              {issue.state}
            </span>
            
            <span className="flex items-center gap-1">
              <MessageCircle size={14} />
              {issue.comments}
            </span>
            
            <span>
              Updated {formatDate(issue.updated_at)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
