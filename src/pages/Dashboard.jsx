/**
 * pages/Dashboard.jsx
 * Protected landing page shown after login.
 * Displays user info and a logout button.
 */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleLabel =
    user?.role === "recruiter" ? "Recruiter" : "Job Seeker";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">JobReach</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Welcome, {user?.name}!
              </h2>
              <p className="text-slate-500 mt-1">{user?.email}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-5">
              <p className="text-sm font-medium text-indigo-600">Role</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">
                {roleLabel}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-5">
              <p className="text-sm font-medium text-emerald-600">Status</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">
                Authenticated
              </p>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-5">
              <p className="text-sm font-medium text-amber-600">Member Since</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900">
              {user?.role === "recruiter"
                ? "Recruiter Dashboard"
                : "Job Seeker Dashboard"}
            </h3>
            <p className="text-slate-500 mt-2 text-sm">
              {user?.role === "recruiter"
                ? "Post jobs, manage applicants, and find the best talent."
                : "Browse jobs, save listings, and track your applications."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
