import { Briefcase, Phone, Target, UserCheck } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard.jsx";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import { MOCK_JOBS, MOCK_APPLICATIONS } from "../../utils/mockData.js";

function DashboardPreviewSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Your AI-Powered Dashboard</h2>
          <p className="mt-4 text-gray-400">Everything you need to manage your job search in one place</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Briefcase size={20} />} title="Jobs Applied" value="24" trend="↑ 5 this week" color="green" />
          <StatCard icon={<Phone size={20} />} title="Interview Calls" value="8" trend="↑ 2 this week" color="blue" />
          <StatCard icon={<Target size={20} />} title="Match Score Avg" value="87%" color="blue" />
          <StatCard icon={<UserCheck size={20} />} title="Profile Completion" value="95%" color="yellow" />
        </div>

        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          <Card className="lg:col-span-3">
            <h3 className="font-semibold text-white mb-4">Recommended for You</h3>
            <div className="space-y-3">
              {MOCK_JOBS.slice(0, 3).map((job) => (
                <div key={job.id} className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">{job.title}</p>
                    <p className="text-xs text-gray-400">{job.company} · {job.location}</p>
                  </div>
                  <Badge variant="info">{job.matchScore}%</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <h3 className="font-semibold text-white mb-4">Career Coach</h3>
            <div className="space-y-2">
              <div className="rounded-lg bg-white/5 px-3 py-2 text-sm text-gray-300">What skills should I focus on?</div>
              <div className="rounded-lg bg-accent/20 px-3 py-2 text-sm text-gray-200">Focus on React, TypeScript, and system design for senior roles.</div>
            </div>
          </Card>
        </div>

        <Card>
          <h3 className="font-semibold text-white mb-4">Recent Applications</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="pb-3 pr-4">Job Title</th>
                  <th className="pb-3 pr-4">Company</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Date Applied</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_APPLICATIONS.slice(0, 4).map((app) => (
                  <tr key={app.id} className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white">{app.jobTitle}</td>
                    <td className="py-3 pr-4 text-gray-400">{app.company}</td>
                    <td className="py-3 pr-4"><Badge variant={app.status === "interview" ? "info" : app.status === "offer" ? "success" : "neutral"}>{app.status}</Badge></td>
                    <td className="py-3 text-gray-400">{app.dateApplied}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default DashboardPreviewSection;
