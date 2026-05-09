import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const userInfo = localStorage.getItem('userInfo');

  if (!userInfo) {
    // Redirect to login if there is no user info in local storage
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the child routes (DashboardLayout)
  return <Outlet />;
};
