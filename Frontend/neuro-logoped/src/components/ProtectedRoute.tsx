
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const token =
    localStorage.getItem('token') ||
    sessionStorage.getItem('token');

  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      console.log('PROTECTED ROUTE: Started');
      console.log('PROTECTED ROUTE: Token exists:', !!token);

      if (!token) {
        console.log('PROTECTED ROUTE: No token found');
        setIsChecking(false);
        return;
      }

      try {
        const response = await fetch(
          'https://localhost:7120/api/test/protected',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('PROTECTED ROUTE: API status:', response.status);

        if (response.status === 401 || response.status === 403) {
          console.log('PROTECTED ROUTE: Token rejected');

          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          setIsAuthorized(false);
          return;
        }

        if (!response.ok) {
          console.log('PROTECTED ROUTE: API error');
          setConnectionError(true);
          return;
        }

        console.log('PROTECTED ROUTE: Authorized!');
        setIsAuthorized(true);
      } catch (error) {
        console.log('PROTECTED ROUTE: Fetch failed:', error);
        setConnectionError(true);
      } finally {
        setIsChecking(false);
      }
    }

    verifyToken();
  }, [token]);

  if (!token) {
    console.log('PROTECTED ROUTE: Redirecting - no token');
    return <Navigate to="/login" replace />;
  }

  if (isChecking) {
    return <p>Verifying your session...</p>;
  }

  if (connectionError) {
    return <p>Could not verify your session. Please check your connection and try again.</p>;
  }

  if (!isAuthorized) {
    console.log('PROTECTED ROUTE: Redirecting - not authorized');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
