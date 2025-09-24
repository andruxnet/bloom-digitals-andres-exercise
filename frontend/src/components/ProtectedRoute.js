import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-3"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
