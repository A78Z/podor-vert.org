import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Parse } from '../../lib/parseClient';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({
  children,
  requireSuperAdmin = false
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = Parse.User.current();

      if (currentUser) {
        // Verify session validity (optional but recommended)
        try {
          await currentUser.fetch();
          setIsAuthenticated(true);
          setIsSuperAdmin(currentUser.get('role') === 'super_admin');
        } catch (error) {
          // Invalid session token
          await Parse.User.logOut();
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h1>
          <p className="text-gray-600">Vous n'avez pas les permissions nécessaires.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
