import { Link } from "react-router-dom";
import Button from "../../components/common/Button.jsx";

function CTASection() {
  return (
    <section className="py-16 hero-gradient">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Find Your Dream Job?</h2>
        <p className="mt-4 text-gray-400 text-lg">Join thousands of job seekers using JobReachAI today</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/register"><Button size="lg">Get Started</Button></Link>
          <Button size="lg" variant="outline">Schedule Demo</Button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
