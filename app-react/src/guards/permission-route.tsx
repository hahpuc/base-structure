import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { RootState } from '@/store';

interface PermissionRouteProps {
  permissions: string | string[];
  mode?: 'all' | 'any';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PermissionRoute: React.FunctionComponent<PermissionRouteProps> = ({
  permissions,
  mode = 'all',
  children,
  fallback = null,
}) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const { permissions: userPermissions, loading } = useSelector(
    (state: RootState) => state.permissions
  );

  // Convert to array for consistent handling
  const permsArr = Array.isArray(permissions) ? permissions : [permissions];

  let allowed = false;
  if (permsArr.length === 0) {
    allowed = true;
  } else if (mode === 'any') {
    allowed = permsArr.some(p => userPermissions.includes(p));
  } else {
    allowed = permsArr.every(p => userPermissions.includes(p));
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  if (loading) {
    return null; // or a loading spinner
  }
  if (!allowed) {
    return fallback || <Navigate to="/error/401" replace />;
  }
  return <>{children}</>;
};

export default PermissionRoute;
