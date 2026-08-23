import { Briefcase, FileText, MessageCircle, Bell, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { formatRelativeTime } from "../../utils/formatters.js";

const typeConfig = {
  application: { 
    icon: Briefcase, 
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20" 
  },
  job: { 
    icon: Sparkles, 
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
  },
  resume: { 
    icon: FileText, 
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20" 
  },
  coach: { 
    icon: MessageCircle, 
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20" 
  },
  reminder: { 
    icon: Clock, 
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20" 
  },
};

function NotificationCard({ notification, onMarkRead }) {
  const config = typeConfig[notification.type] || { 
    icon: Bell, 
    color: "text-gray-400 bg-white/5 border-white/10" 
  };
  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.008 }}
      whileTap={{ scale: 0.995 }}
      onClick={() => onMarkRead?.(notification)}
      className={`glass-card !p-4.5 cursor-pointer border transition-all duration-200 rounded-xl relative overflow-hidden flex items-start gap-4 ${
        !notification.read 
          ? "bg-accent/[0.04] border-accent/25 shadow-sm" 
          : "hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
      }`}
      style={{ background: notification.read ? "var(--bg-card)" : undefined, borderColor: "var(--border-color)" }}
    >
      {/* Visual left bar for unread notifications */}
      {!notification.read && (
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent" />
      )}

      {/* Icon Wrapper */}
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${config.color}`}>
        <Icon size={18} />
      </div>

      {/* Info Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <h4 className="text-sm font-bold truncate" style={{ color: "var(--text-primary)" }}>{notification.title}</h4>
            {!notification.read && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
            )}
          </div>
          
          <span className="text-[10px] font-semibold text-gray-500 shrink-0 mt-0.5">
            {formatRelativeTime(notification.timestamp)}
          </span>
        </div>

        <p className="text-xs md:text-sm mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {notification.description}
        </p>
      </div>
    </motion.div>
  );
}

export default NotificationCard;
