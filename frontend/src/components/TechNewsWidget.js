import { useState, useEffect } from 'react';

import TechNewsLoading from './TechNewsLoading';
import TechNewsError from './TechNewsError';
import TechNewsList from './TechNewsList';
import ItemsNotFound from './ItemsNotFound';

import { hackerNewsService } from '../services/hackerNewsService';

const TechNewsWidget = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      setLoading(true);
      setError('');
      // Get top 5 stories
      const data = await hackerNewsService.getTopStoriesWithDetails(5);
      setStories(data);
    } catch (error) {
      console.error('Error loading stories:', error);
      setError('Failed to load tech news');
    } finally {
      setLoading(false);
    }
  };

  const handleStoryClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };


  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <TechNewsLoading message="Loading stories..." />
        </div>
      );
    }
    
    if (error) {
      return (
        <TechNewsError 
          error={error} 
          onRetry={loadStories}
          retryText="Retry"
        />
      );
    }
    
    if (!stories || stories.length === 0) {
      return (
        <ItemsNotFound 
          title="No stories found"
          message="Unable to load tech news stories at the moment."
          actionText="Try Again"
          onAction={loadStories}
          showAction={true}
        />
      );
    }
    
    return <TechNewsList stories={stories} onStoryClick={handleStoryClick} />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Tech News</h3>
      </div>

      <div className="p-6">
        {renderContent()}
      </div>

      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
        <p className="text-center text-xs text-gray-500">
          Powered by{' '}
          <a 
            href="https://news.ycombinator.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Hacker News
          </a>
        </p>
      </div>
    </div>
  );
};

export default TechNewsWidget;
