import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthHook } from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthHook();

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default PrivateRoute;