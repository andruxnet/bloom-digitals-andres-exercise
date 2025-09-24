const TechNewsError = ({ 
  error = 'Failed to load news',
  onRetry,
  retryText = 'Retry'
}) => {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">⚠️</div>
      <p className="text-red-600 mb-4">{error}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {retryText}
        </button>
      )}
    </div>
  );
};

export default TechNewsError;


