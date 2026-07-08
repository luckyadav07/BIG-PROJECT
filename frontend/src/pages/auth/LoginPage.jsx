import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import LoginForm from "../../components/forms/LoginForm.jsx";
import { APP_NAME } from "../../utils/constants.js";

function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left hero */}
      <div className="hidden lg:flex hero-gradient items-center justify-center p-12">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg accent-gradient">
              <Sparkles size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{APP_NAME}</span>
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight">
            Join thousands finding better jobs
          </h2>
          <p className="mt-4 text-gray-400 text-lg leading-relaxed max-w-md">
            AI-powered job matching, resume analysis, and career coaching — all in one platform.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 bg-navy">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-bold text-white">{APP_NAME}</h1>
          </div>
          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Welcome back</h2>
            <LoginForm />
            <p className="mt-6 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-accent hover:underline font-medium">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
