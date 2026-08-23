import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Bell, Sparkles, BellOff, ArrowRight } from "lucide-react";
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
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2.5 tracking-tight">
            <Bell className="text-accent" />
            Alert Center
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
            Stay updated with mock interviews, career coach replies, and job recommendations.
            {unreadCount > 0 && (
              <span className="text-accent-light font-bold ml-1">
                ({unreadCount} unread)
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            style={{ background: "var(--bg-elevated)" }}
          >
            <option value="all" className="bg-navy">All Alerts</option>
            <option value="unread" className="bg-navy">Unread</option>
          </select>
          
          <Button size="sm" variant="outline" onClick={markAllRead} className="!text-xs font-bold py-2 px-3 rounded-xl border border-white/5 cursor-pointer">
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
              <h3 className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest pl-1">
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
              <h3 className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest pl-1">
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
              <h3 className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest pl-1">
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
