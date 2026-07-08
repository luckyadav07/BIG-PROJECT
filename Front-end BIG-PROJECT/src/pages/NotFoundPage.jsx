import { Link } from "react-router-dom";
import Button from "../components/common/Button.jsx";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-accent">404</h1>
        <p className="text-xl text-white mt-4">Page not found</p>
        <p className="text-gray-400 mt-2">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="inline-block mt-6"><Button>Go Home</Button></Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
