import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Bell, Sparkles, BellOff, ArrowRight, Inbox, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NotificationCard from "../../components/notification/NotificationCard.jsx";
import Button from "../../components/common/Button.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { MOCK_NOTIFICATIONS } from "../../utils/mockData.js";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = useMemo(() => {
    return notifications.filter((n) => (filter === "unread" ? !n.read : true));
  }, [notifications, filter]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const markRead = (notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Group notifications chronologically into Today, Yesterday, and Earlier
  const grouped = useMemo(() => {
    const todayList = [];
    const yesterdayList = [];
    const earlierList = [];

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 86400000;

    filtered.forEach((n) => {
      const time = new Date(n.timestamp).getTime();
      if (time >= startOfToday) {
        todayList.push(n);
      } else if (time >= startOfYesterday) {
        yesterdayList.push(n);
      } else {
        earlierList.push(n);
      }
    });

    return { today: todayList, yesterday: yesterdayList, earlier: earlierList };
  }, [filtered]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Top Header Control Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2.5 tracking-tight" style={{ color: "var(--text-primary)" }}>
            <Bell className="text-accent" />
            Alert Center
          </h1>
          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Stay updated with mock interviews, career coach replies, and job recommendations.
            {unreadCount > 0 && (
              <span className="text-accent-light font-bold ml-1">
                ({unreadCount} unread)
              </span>
            )}
          </p>
        </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="relative">
          <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl border px-3.5 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer flex items-center gap-2 select-none"
              style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            >
              {filter === "all" ? (
                <span className="flex items-center gap-1.5">
                  <Bell size={12} className="text-accent" />
                  All Alerts
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  Unread Only
                </span>
              )}
              <ChevronDown size={14} style={{ color: "var(--text-secondary)" }} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 mt-2 w-44 rounded-2xl border p-1.5 shadow-2xl z-50 overflow-hidden flex flex-col gap-1 backdrop-blur-md"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
                  >
                    <button
                      onClick={() => {
                        setFilter("all");
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer select-none ${
                        filter === "all" 
                          ? "bg-accent/10 text-accent-light" 
                          : "hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                      style={{ color: filter === "all" ? "var(--color-accent-light)" : "var(--text-primary)" }}
                    >
                      <span className="flex items-center gap-2">
                        <Bell size={12} className={filter === "all" ? "text-accent-light" : "text-gray-400"} />
                        All Alerts
                      </span>
                      {filter === "all" && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </button>

                    <button
                      onClick={() => {
                        setFilter("unread");
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer select-none ${
                        filter === "unread" 
                          ? "bg-accent/10 text-accent-light" 
                          : "hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                      style={{ color: filter === "unread" ? "var(--color-accent-light)" : "var(--text-primary)" }}
                    >
                      <span className="flex items-center gap-2">
                        <Inbox size={12} className={filter === "unread" ? "text-accent-light" : "text-gray-400"} />
                        Unread
                      </span>
                      {unreadCount > 0 ? (
                        <span className="bg-accent text-white rounded-full text-[9px] font-black h-4 px-1.5 flex items-center justify-center min-w-4">
                          {unreadCount}
                        </span>
                      ) : (
                        filter === "unread" && <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      )}
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={markAllRead} 
            className="!text-xs font-bold py-2 px-3 rounded-xl border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            Mark all read
          </Button>
        </div>
      </div>

      {/* Grouped Notifications List */}
      {filtered.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Today Group */}
          {grouped.today.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-2.5">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest pl-1" style={{ color: "var(--text-secondary)" }}>
                Today
              </h3>
              <div className="space-y-3">
                {grouped.today.map((n) => (
                  <NotificationCard key={n.id} notification={n} onMarkRead={markRead} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Yesterday Group */}
          {grouped.yesterday.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-2.5">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest pl-1" style={{ color: "var(--text-secondary)" }}>
                Yesterday
              </h3>
              <div className="space-y-3">
                {grouped.yesterday.map((n) => (
                  <NotificationCard key={n.id} notification={n} onMarkRead={markRead} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Earlier Group */}
          {grouped.earlier.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-2.5">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest pl-1" style={{ color: "var(--text-secondary)" }}>
                Earlier
              </h3>
              <div className="space-y-3">
                {grouped.earlier.map((n) => (
                  <NotificationCard key={n.id} notification={n} onMarkRead={markRead} />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      ) : (
        /* Premium Empty State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <EmptyState
            icon={BellOff}
            title={filter === "unread" ? "All Caught Up!" : "No Alerts Available"}
            description={
              filter === "unread" 
                ? "You have read all notifications in your feed. Select 'All Alerts' to review historical logs." 
                : "Your notifications inbox is currently empty. Explore our jobs catalog to receive application updates!"
            }
            action={
              <Link to="/jobs">
                <Button className="font-semibold text-xs py-2 px-5 rounded-lg flex items-center gap-2">
                  Browse Jobs
                  <ArrowRight size={16} />
                </Button>
              </Link>
            }
          />
        </motion.div>
      )}
    </div>
  );
}

export default NotificationsPage;
