import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Sparkles, ArrowLeft } from "lucide-react";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import { APP_NAME } from "../../utils/constants.js";

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => {
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg accent-gradient mb-4">
            <Sparkles size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">{APP_NAME}</h1>
        </div>

        <div className="glass-card p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-success text-4xl mb-4">✓</div>
              <h2 className="text-xl font-semibold text-white mb-2">Check your email</h2>
              <p className="text-gray-400 text-sm">We&apos;ve sent a reset link to your email address.</p>
              <Link to="/login" className="inline-flex items-center gap-1 mt-6 text-sm text-accent hover:underline">
                <ArrowLeft size={14} /> Back to login
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white mb-2">Forgot password?</h2>
              <p className="text-sm text-gray-400 mb-6">Enter your email and we&apos;ll send a reset link.</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                  })}
                />
                <Button type="submit" className="w-full">Send Reset Link</Button>
              </form>
              <Link to="/login" className="inline-flex items-center gap-1 mt-4 text-sm text-accent hover:underline">
                <ArrowLeft size={14} /> Back to login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
