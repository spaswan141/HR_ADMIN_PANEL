import React from 'react';
import { Navigate } from 'react-router-dom';
import PublicRoutes from './publicRoutes';
import ProtectedRoutes from './protectedRoutes';

const MainRoutes = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <ProtectedRoutes />;
  }

  // Not authenticated → Always show PublicRoutes
  return <PublicRoutes /> || <Navigate to="/login" replace />;
};

export default MainRoutes;
