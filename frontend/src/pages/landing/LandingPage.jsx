import Navbar from "../../components/common/Navbar.jsx";
import Footer from "../../components/common/Footer.jsx";
import HeroSection from "./HeroSection.jsx";
import FeaturesSection from "./FeaturesSection.jsx";
import DashboardPreviewSection from "./DashboardPreviewSection.jsx";
import JobsPreviewSection from "./JobsPreviewSection.jsx";
import TestimonialsSection from "./TestimonialsSection.jsx";
import PricingSection from "./PricingSection.jsx";
import CTASection from "./CTASection.jsx";

function LandingPage() {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DashboardPreviewSection />
      <JobsPreviewSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default LandingPage;
