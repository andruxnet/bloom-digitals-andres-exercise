import { hackerNewsService } from '../services/hackerNewsService';

const TechNewsCard = ({ story, index, onClick }) => {
  const handleClick = () => {
    if (story.url && onClick) {
      onClick(story.url);
    }
  };

  return (
    <div 
      className={`p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all ${
        story.url ? 'cursor-pointer hover:bg-gray-100 hover:border-indigo-300 hover:shadow-md' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
          {index + 1}
        </span>
        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded font-medium">
          {story.domain}
        </span>
      </div>
      
      <h4 className="text-sm font-semibold text-gray-900 mb-3 leading-tight">
        {story.title}
      </h4>
      
      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
        <span>
          by {story.by}
        </span>
        <span>
          {hackerNewsService.formatTimeAgo(story.time)}
        </span>
      </div>
    </div>
  );
};

export default TechNewsCard;
