const ItemsNotFound = ({ 
  title = 'No items found',
  message = 'There are no items to display at the moment.',
  actionText,
  onAction,
  showAction = false 
}) => {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">📭</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {showAction && actionText && onAction && (
        <button 
          onClick={onAction} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default ItemsNotFound;
