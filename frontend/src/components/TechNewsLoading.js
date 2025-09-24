const TechNewsLoading = ({ message = 'Loading stories...' }) => {
  return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default TechNewsLoading;


