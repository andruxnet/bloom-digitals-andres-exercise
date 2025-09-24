// Hacker News API service (no API key required)
const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';

export const hackerNewsService = {
  // Get top story IDs
  async getTopStories(limit) {
    try {
      const response = await fetch(`${HN_API_BASE}/topstories.json`);
      if (!response.ok) {
        throw new Error(`Hacker News API error: ${response.status}`);
      }

      // Get top within limit
      return (await response.json()).slice(0, limit);
    } catch (error) {
      console.error('Error fetching top stories:', error);
      throw error;
    }
  },

  // Get story details by ID
  async getStoryDetails(storyId) {
    try {
      const response = await fetch(`${HN_API_BASE}/item/${storyId}.json`);
      if (!response.ok) {
        throw new Error(`Hacker News API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching story ${storyId}:`, error);
      throw error;
    }
  },

  // Get top stories with details
  async getTopStoriesWithDetails(limit = 5) {
    try {
      const storyPromises = (await this.getTopStories(limit)).map(id => this.getStoryDetails(id));
      const stories = await Promise.all(storyPromises);
      
      // Filter out null stories and format the data
      return stories
        .map(story => ({
          ...story,
          score: story.score || 0,
          descendants: story.descendants || 0, // default to 0 comments
          domain: story.url 
            ? new URL(story.url).hostname.replace('www.', '') 
            : 'news.ycombinator.com' // default to Hacker News domain
        }));
    } catch (error) {
      console.error('Error fetching top stories with details:', error);
      throw error;
    }
  },

  // Format time ago
  formatTimeAgo(timestamp) {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    
    if (diff < 3600) {
      return `${Math.floor(diff / 60)}m ago`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)}h ago`;
    } else {
      return `${Math.floor(diff / 86400)}d ago`;
    }
  }
};
