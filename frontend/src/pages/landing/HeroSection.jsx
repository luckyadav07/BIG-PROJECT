import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, FileText, MessageCircle, TrendingUp } from "lucide-react";
import Button from "../../components/common/Button.jsx";

function HeroSection() {
  return (
    <section className="hero-gradient min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-[48px] font-bold text-white leading-tight tracking-tight">
              Your AI-Powered Career Copilot
            </h1>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-xl">
              Discover jobs perfectly matched to your skills, get personalized AI recommendations,
              analyze your resume, and receive career guidance from an AI coach.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register"><Button size="lg">Get Started Free</Button></Link>
              <Link to="/jobs"><Button size="lg" variant="outline">Explore Jobs</Button></Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Trusted by 5000+ job seekers | 50+ Companies
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card p-6 animate-float">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400">AI Match Score</span>
                <span className="text-2xl font-bold text-accent">95%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 mb-6">
                <div className="h-full w-[95%] rounded-full accent-gradient" />
              </div>

              <div className="space-y-3 mb-4">
                {["Frontend Developer — TechCorp", "Full Stack — StartupHub", "Backend Dev — CloudNine"].map((job) => (
                  <div key={job} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                    <span className="text-sm text-gray-300">{job}</span>
                    <Sparkles size={14} className="text-accent" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-lg p-3">
                  <FileText size={16} className="text-accent mb-1" />
                  <p className="text-xs text-gray-400">Resume Analysis</p>
                  <p className="text-sm font-semibold text-success">3 improvements</p>
                </div>
                <div className="glass rounded-lg p-3">
                  <MessageCircle size={16} className="text-accent mb-1" />
                  <p className="text-xs text-gray-400">Career Coach</p>
                  <p className="text-sm text-gray-300 truncate">Focus on React...</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 glass-card p-3 animate-float" style={{ animationDelay: "1s" }}>
              <TrendingUp size={20} className="text-success" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
