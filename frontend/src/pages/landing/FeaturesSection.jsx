import { motion } from "framer-motion";
import { Sparkles, FileText, MessageCircle, CheckCircle2, Target, Search } from "lucide-react";
import Card from "../../components/common/Card.jsx";

const features = [
  { icon: Sparkles, title: "AI Job Recommendations", desc: "AI analyzes your skills and recommends perfect jobs that match your expertise" },
  { icon: FileText, title: "Resume Analyzer", desc: "Upload your resume and get AI-powered insights, improvements, and match scores with jobs" },
  { icon: MessageCircle, title: "AI Career Coach", desc: "Chat with AI to get career advice, interview prep, and skill development guidance" },
  { icon: CheckCircle2, title: "Application Tracker", desc: "Track all your job applications, follow-up reminders, and interview schedules in one place" },
  { icon: Target, title: "Skill Gap Analysis", desc: "Identify missing skills for your dream jobs and get personalized learning paths" },
  { icon: Search, title: "Smart Search & Filters", desc: "Instantly find relevant opportunities with advanced filters and smart search" },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-navy-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Powerful Features</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Everything you need to accelerate your job search with AI</p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <Card hover className="h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">
                  <f.icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
