/**
 * pages/Register.jsx
 * Registration page with name, email, password, and role selection.
 * On success: auto-logs in with returned token and redirects to dashboard.
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { registerUser } from "../services/authService.js";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await registerUser({ name, email, password, role });
      login(data.data.user, data.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            JobReach
          </h1>
          <p className="text-indigo-300 mt-2">Create your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Register</h2>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/20 border border-red-400/50 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-indigo-200 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                disabled={loading}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-indigo-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-indigo-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-indigo-200 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-indigo-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-2">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "jobseeker", label: "Job Seeker" },
                  { value: "recruiter", label: "Recruiter" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    disabled={loading}
                    onClick={() => setRole(option.value)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition disabled:opacity-50 ${
                      role === option.value
                        ? "border-indigo-400 bg-indigo-500/30 text-white"
                        : "border-white/20 bg-white/5 text-indigo-200 hover:bg-white/10"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-indigo-500 py-2.5 font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="mt-6 text-center text-sm text-indigo-300">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-white hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
