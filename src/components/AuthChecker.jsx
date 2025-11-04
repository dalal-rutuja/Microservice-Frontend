// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Import useAuth

// const AuthChecker = ({ children }) => {
//   const navigate = useNavigate();
//   const { token, loading } = useAuth(); // Get token and loading state from AuthContext

//   useEffect(() => {
//     // Add a small delay to allow AuthContext to fully initialize
//     const timer = setTimeout(() => {
//       if (!loading && !token) {
//         navigate('/login');
//       }
//     }, 100);

//     return () => clearTimeout(timer);
//   }, [token, loading, navigate]); // Add token and loading to dependency array

//   // Render children only when authentication state is loaded
//   if (loading) {
//     return <div>Loading authentication...</div>; // Or a spinner, or null
//   }

//   return <>{children}</>;
// };

// export default AuthChecker;


import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthChecker = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Don't redirect if still loading
    if (loading) {
      return;
    }

    // Don't redirect if user is authenticated
    if (isAuthenticated) {
      return;
    }

    // Don't redirect if already on login or register pages
    const publicRoutes = ['/login', '/register', '/', '/forgot-password'];
    if (publicRoutes.includes(location.pathname)) {
      return;
    }

    // Redirect to login if not authenticated and not on a public route
    console.log('AuthChecker: User not authenticated, redirecting to login');
    navigate('/login', { 
      replace: true,
      state: { from: location.pathname } // Save the attempted route
    });
  }, [isAuthenticated, loading, navigate, location.pathname]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1AA49B]"></div>
      </div>
    );
  }

  // Render children if authenticated or on public routes
  return <>{children}</>;
};

export default AuthChecker;