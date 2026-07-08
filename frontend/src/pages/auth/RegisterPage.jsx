import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import RegisterForm from "../../components/forms/RegisterForm.jsx";
import { APP_NAME } from "../../utils/constants.js";

function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex hero-gradient items-center justify-center p-12">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg accent-gradient">
              <Sparkles size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{APP_NAME}</span>
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight">
            Start your career journey today
          </h2>
          <p className="mt-4 text-gray-400 text-lg leading-relaxed max-w-md">
            Get AI-matched jobs, analyze your resume, and chat with your personal career coach.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 bg-navy py-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-bold text-white">{APP_NAME}</h1>
          </div>
          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Create your account</h2>
            <RegisterForm />
            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-accent hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
