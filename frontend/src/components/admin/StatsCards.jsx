import Card from "../common/Card.jsx";
import { Users, Briefcase, ShieldCheck, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Total Jobs Listed",
      value: stats.totalJobs,
      icon: Briefcase,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Total Admins",
      value: stats.totalAdmins,
      icon: ShieldCheck,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Active Sessions",
      value: stats.activeUsers,
      icon: Activity,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.995 }}
            className="h-full"
          >
            <Card className="border border-white/5 h-full !p-5 hover:border-white/10 transition-all duration-200" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "var(--text-secondary)" }}>
                    {card.title}
                  </p>
                  <p className="text-2xl font-black mt-2 leading-none" style={{ color: "var(--text-primary)" }}>
                    {card.value}
                  </p>
                </div>

                <div className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center border ${card.color}`}>
                  <Icon size={20} />
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}