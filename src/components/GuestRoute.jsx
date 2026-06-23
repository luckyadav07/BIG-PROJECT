/**
 * components/GuestRoute.jsx
 * Wraps public pages (Login, Register).
 * Redirects already-authenticated users to the dashboard
 * so they don't see login/register again.
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const GuestRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    );
  }

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;
