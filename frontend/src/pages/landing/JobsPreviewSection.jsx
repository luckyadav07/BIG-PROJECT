import { Link } from "react-router-dom";
import JobCard from "../../components/job/JobCard.jsx";
import Button from "../../components/common/Button.jsx";
import { MOCK_JOBS } from "../../utils/mockData.js";

function JobsPreviewSection() {
  return (
    <section id="jobs" className="py-20 bg-navy-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Featured Jobs</h2>
            <p className="mt-2 text-gray-400">Top opportunities matched by AI</p>
          </div>
          <Link to="/jobs" className="hidden sm:block">
            <Button variant="outline" size="sm">View All Jobs</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_JOBS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobsPreviewSection;
