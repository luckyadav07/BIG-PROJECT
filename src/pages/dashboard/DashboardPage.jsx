import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Phone, Target, UserCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import JobCard from "../../components/job/JobCard.jsx";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Skeleton from "../../components/common/Skeleton.jsx";
import useJobStore from "../../store/jobStore.js";
import { MOCK_APPLICATIONS, DASHBOARD_STATS, SKILL_RECOMMENDATIONS } from "../../utils/mockData.js";
import { StatusBadge } from "../../components/application/ApplicationCard.jsx";
import useUIStore from "../../store/uiStore.js";

function DashboardPage() {
  const { user } = useAuth();
  const { recommendedJobs, loading, fetchRecommended } = useJobStore();
  const addToast = useUIStore((s) => s.addToast);

  useEffect(() => {
    fetchRecommended();
  }, [fetchRecommended]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name?.split(" ")[0]}!</h1>
        <p className="text-gray-400 mt-1">
          {DASHBOARD_STATS.matchScore}% match score · {DASHBOARD_STATS.jobsApplied} applications · {DASHBOARD_STATS.interviews} interviews
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Briefcase size={20} />} title="Jobs Applied" value={DASHBOARD_STATS.jobsApplied} trend="↑ 5 this week" color="green" />
        <StatCard icon={<Phone size={20} />} title="Interview Calls" value={DASHBOARD_STATS.interviews} trend="↑ 2 this week" color="blue" />
        <StatCard icon={<Target size={20} />} title="Match Score Avg" value={`${DASHBOARD_STATS.matchScore}%`} color="blue" />
        <StatCard icon={<UserCheck size={20} />} title="Profile Completion" value={`${DASHBOARD_STATS.profileCompletion}%`} color="yellow" />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recommended for You</h2>
            <Link to="/recommended" className="text-sm text-accent hover:underline">See All</Link>
          </div>
          {loading ? (
            <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} height="120px" />)}</div>
          ) : (
            <div className="grid gap-4">
              {recommendedJobs.slice(0, 3).map((job) => (
                <JobCard key={job.id || job._id} job={job} onApply={() => addToast("Application submitted!", "success")} />
              ))}
            </div>
          )}
        </div>

        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">Chat with Career Coach</h2>
          <div className="space-y-2 mb-4">
            <div className="rounded-lg bg-white/5 px-3 py-2 text-sm text-gray-300">What skills should I focus on?</div>
            <div className="rounded-lg bg-accent/20 px-3 py-2 text-sm text-gray-200">Focus on React, TypeScript, and system design.</div>
          </div>
          <Link to="/career-coach" className="text-sm text-accent hover:underline">Start conversation →</Link>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-white mb-4">Recent Applications</h2>
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="pb-3 pr-4">Job Title</th>
                <th className="pb-3 pr-4">Company</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Date Applied</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_APPLICATIONS.map((app) => (
                <tr key={app.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 pr-4 text-white">{app.jobTitle}</td>
                  <td className="py-3 pr-4 text-gray-400">{app.company}</td>
                  <td className="py-3 pr-4"><StatusBadge status={app.status} /></td>
                  <td className="py-3 pr-4 text-gray-400">{app.dateApplied}</td>
                  <td className="py-3"><Link to="/applications" className="text-accent hover:underline text-xs">View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Skill Recommendations</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {SKILL_RECOMMENDATIONS.map((s) => (
            <Card key={s.id}>
              <p className="font-semibold text-white">Learn {s.skill}</p>
              <p className="text-sm text-gray-400 mt-1">{s.reason}</p>
              <button className="mt-3 text-sm text-accent hover:underline">View Learning Path →</button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
