import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Phone,
  Target,
  UserCheck,
  Sparkles,
  MessageSquare,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import ApplicationRow from "../../components/dashboard/ApplicationRow.jsx";
import JobCard from "../../components/job/JobCard.jsx";
import Card from "../../components/common/Card.jsx";
import Alert from "../../components/common/Alert.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Button from "../../components/common/Button.jsx";
import Badge from "../../components/common/Badge.jsx";
import Skeleton from "../../components/common/Skeleton.jsx";
import useJobStore from "../../store/jobStore.js";
import useUIStore from "../../store/uiStore.js";
import { getApplications, applyJob } from "../../services/applicationService.js";

function DashboardPage() {
  const { user } = useAuth();
  const recommendedJobs = useJobStore((s) => s.recommendedJobs) || [];
  const loading = useJobStore((s) => s.loading);
  const error = useJobStore((s) => s.error);
  const fetchRecommended = useJobStore((s) => s.fetchRecommended);
  const showToast = useUIStore((s) => s.showToast);
  const [applications, setApplications] = useState([]);

  const handleApply = async (job) => {
    try {
      await applyJob(job.id || job._id);

      showToast({
        message: "Application submitted!",
        type: "success",
      });

      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      showToast({
        message:
          err.response?.data?.message || "Failed to apply.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchRecommended();

    const loadApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadApplications();
  }, [fetchRecommended]);

  const jobsApplied = applications.length;

  const interviewCalls = applications.filter(
    (app) => app.status?.toLowerCase() === "interview"
  ).length;

  const avgMatchScore =
    recommendedJobs.length > 0
      ? Math.round(
          recommendedJobs.reduce(
            (sum, job) => sum + (job.matchScore || 0),
            0
          ) / recommendedJobs.length
        )
      : 0;

  const profileFields = [
    user?.name,
    user?.email,
    user?.phone,
    user?.resume,
    user?.skills?.length > 0,
  ];

  const completedFields = profileFields.filter(Boolean).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  const appliedJobIds = new Set(
    applications.map((app) => app.jobId?._id)
  );

  const userSkills = user?.skills || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1
          className="text-h1"
          style={{ color: "var(--text-primary)" }}
        >
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>

        <p
          className="text-secondary-type mt-1.5"
          style={{ color: "var(--text-secondary)" }}
        >
          Here&apos;s an overview of your job search progress.
        </p>

        {error && (
          <Alert variant="danger" className="mt-4">
            {error}
          </Alert>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Briefcase size={20} />}
          title="Jobs Applied"
          value={jobsApplied}
          trend={`${jobsApplied} total applications`}
          color="green"
        />

        <StatCard
          icon={<Phone size={20} />}
          title="Interview Calls"
          value={interviewCalls}
          trend={`${interviewCalls} scheduled`}
          color="blue"
        />

        <StatCard
          icon={<Target size={20} />}
          title="Match Score Avg"
          value={`${avgMatchScore}%`}
          trend="Based on AI recommendations"
          color="blue"
        />

        <StatCard
          icon={<UserCheck size={20} />}
          title="Profile Completion"
          value={`${profileCompletion}%`}
          trend={`${completedFields}/${profileFields.length} fields complete`}
          color="yellow"
        />
      </div>

      {/* Recommended + Career Coach */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-accent" />
              <h2
                className="text-h3"
                style={{ color: "var(--text-primary)" }}
              >
                Recommended for You
              </h2>
            </div>

            <Link
              to="/recommended"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent transition hover:underline"
            >
              See all
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} height="120px" />
              ))}
            </div>
          ) : recommendedJobs.length > 0 ? (
            <div className="grid gap-4">
              {recommendedJobs.slice(0, 3).map((job) => (
                <JobCard
                  key={job.id || job._id}
                  job={job}
                  onApply={handleApply}
                  applied={appliedJobIds.has(job._id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <EmptyState
                icon={Briefcase}
                title="No recommendations yet"
                description="Complete your profile and upload your resume to receive personalized job matches."
                action={
                  <Link to="/profile">
                    <Button variant="outline" size="sm">
                      Complete Profile
                    </Button>
                  </Link>
                }
              />
            </Card>
          )}
        </div>

        <Card className="lg:col-span-2 flex flex-col" variant="ai">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-accent" />
            <h2
              className="text-h3"
              style={{ color: "var(--text-primary)" }}
            >
              Career Coach
            </h2>
          </div>

          <div className="flex-1 space-y-3">
            <div
              className="rounded-xl rounded-br-sm px-4 py-2.5 text-sm"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
              }}
            >
              What skills should I focus on?
            </div>

            <div className="rounded-xl rounded-bl-sm bg-accent/15 px-4 py-2.5 text-sm text-accent">
              Focus on React, TypeScript, and system design to strengthen your
              profile for senior roles.
            </div>
          </div>

          <Link to="/career-coach" className="mt-4 block">
            <Button variant="outline" size="sm" className="w-full">
              Start conversation
              <ArrowRight size={14} />
            </Button>
          </Link>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={18} style={{ color: "var(--text-secondary)" }} />
            <h2
              className="text-h3"
              style={{ color: "var(--text-primary)" }}
            >
              Recent Applications
            </h2>
          </div>

          {applications.length > 0 && (
            <Link
              to="/applications"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent transition hover:underline"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {applications.length > 0 ? (
          <div className="space-y-2">
            {applications.slice(0, 5).map((app) => (
              <ApplicationRow key={app._id} application={app} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title="No applications yet"
            description="Start applying to jobs that match your skills and experience."
            action={
              <Link to="/jobs">
                <Button size="sm">Browse Jobs</Button>
              </Link>
            }
          />
        )}
      </Card>

      {/* Skill Recommendations */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Target size={18} className="text-accent" />
          <h2
            className="text-h3"
            style={{ color: "var(--text-primary)" }}
          >
            Your Skills
          </h2>
        </div>

        <Card>
          {userSkills.length > 0 ? (
            <div>
              <p
                className="text-secondary-type mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                Skills from your profile. Keep them updated to improve job
                matches.
              </p>

              <div className="flex flex-wrap gap-2">
                {userSkills.map((skill) => (
                  <Badge key={skill} variant="info">
                    {skill}
                  </Badge>
                ))}
              </div>

              <Link
                to="/profile"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition hover:underline"
              >
                Update skills
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <EmptyState
              icon={Target}
              title="Add your skills"
              description="Add skills to your profile to get better job recommendations and match scores."
              action={
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    Add Skills
                  </Button>
                </Link>
              }
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;
