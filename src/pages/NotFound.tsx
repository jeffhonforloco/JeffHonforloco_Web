
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HomeIcon, RotateCcw, Search, Book, SearchX, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Layout from "../components/layout/Layout";
import { Input } from "@/components/ui/input";
import { getPosts } from "@/lib/wordpress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Avoid showing error toast for the 404 route itself
    if (location.pathname !== '/404') {
      // Log detailed information about the 404 error
      console.error("404 Error: Page not found -", location.pathname);
      console.log("Query params:", location.search);
      console.log("Referrer:", document.referrer);
      
      // Extract potential search term from URL path
      const pathParts = location.pathname.split('/').filter(Boolean);
      if (pathParts.length > 0) {
        // Use the last part of the path as initial search query
        setSearchQuery(pathParts[pathParts.length - 1].replace(/-/g, ' '));
      }
      
      // Show toast notification
      toast({
        title: "Page not found",
        description: `We couldn't find the page "${location.pathname}"`,
        variant: "destructive",
      });
    }
  }, [location.pathname, location.search, toast]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      // Search for content with the query
      const results = await getPosts({ search: searchQuery, perPage: 5 });
      setSuggestions(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (slug: string) => {
    navigate(`/post/${slug}`);
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-8xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Page Not Found
        </h2>
        
        <Alert variant="destructive" className="mb-8 max-w-lg">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Sorry, we couldn't find the page "{location.pathname}". The page might have been removed, 
            had its name changed, or is temporarily unavailable.
          </AlertDescription>
        </Alert>
        
        {/* Search form */}
        <div className="w-full max-w-md mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for content"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" disabled={loading}>
              <Search className="h-5 w-5" />
            </Button>
          </form>
          
          {/* Search suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-md shadow-md p-4 text-left">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Book className="h-4 w-4 mr-2" />
                Suggested content:
              </h3>
              <ul className="space-y-2">
                {suggestions.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSuggestionClick(item.slug)}
                      className="text-primary hover:underline text-left w-full truncate"
                    >
                      <span dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {suggestions.length === 0 && !loading && searchQuery && (
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-md shadow-md p-4 text-left">
              <p className="text-sm flex items-center text-gray-600 dark:text-gray-300">
                <SearchX className="h-4 w-4 mr-2" />
                No results found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
        
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
