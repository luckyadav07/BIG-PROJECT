import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";

const plans = [
  {
    name: "FREE",
    price: "₹0",
    desc: "Start your job search journey",
    features: ["AI job recommendations (5/day)", "Resume upload (1)", "Application tracker (basic)", "Search all jobs (basic filter)"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "PRO",
    price: "₹299",
    desc: "For active job seekers",
    features: ["AI job recommendations (unlimited)", "Resume upload (5)", "Advanced application tracker", "AI Career Coach (50 messages/month)", "Skill gap analysis", "Advanced filters", "Priority support"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "CAREER PLUS",
    price: "₹799",
    desc: "Complete career transformation",
    features: ["Everything in Pro", "Unlimited AI Career Coach messages", "Resume optimization service", "LinkedIn profile review", "1-on-1 career mentorship (1/month)", "Interview prep coaching", "Priority support (24/7)"],
    cta: "Get Career Plus",
    popular: false,
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-navy-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-gray-400">Choose the plan that fits your career goals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${plan.popular ? "border-accent border-2 scale-105" : ""}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full accent-gradient px-3 py-0.5 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{plan.desc}</p>
              <p className="text-3xl font-bold text-accent mt-4">{plan.price}<span className="text-sm text-gray-400 font-normal">/month</span></p>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check size={16} className="text-success shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="mt-6 block">
                <Button className="w-full" variant={plan.popular ? "primary" : "outline"}>{plan.cta}</Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
