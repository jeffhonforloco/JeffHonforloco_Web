
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { HomeIcon, RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Layout from "../components/layout/Layout";

const NotFound = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    console.error("404 Error: Page not found -", location.pathname);
    
    // Show toast notification
    toast({
      title: "Page not found",
      description: `We couldn't find the page "${location.pathname}"`,
      variant: "destructive",
    });
  }, [location.pathname, toast]);

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-8xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
          Sorry, we couldn't find the page you're looking for. The page might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <HomeIcon className="h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/blog">
              <Search className="h-5 w-5" />
              Browse Articles
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg"
            className="gap-2"
            onClick={() => window.history.back()}
          >
            <RotateCcw className="h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
