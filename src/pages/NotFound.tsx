import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";

const NotFound = () => {
  usePageTitle("Page Not Found");

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold font-heading">404</h1>
        <p className="text-xl text-muted-foreground">Page not found</p>
        <Link
          to="/"
          className="inline-block text-accent hover:text-accent/80 underline transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
