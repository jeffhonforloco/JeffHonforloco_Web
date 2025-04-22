import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SEO from '../components/shared/SEO';
import PostCard from '../components/blog/PostCard';
import { getPosts, transformPost } from '@/lib/wordpress';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

interface TravelTipsProps {
  category?: string;
}

const TravelTips: React.FC<TravelTipsProps> = ({ category: propCategory }) => {
  const { category: paramCategory } = useParams<{ category?: string }>();
  const category = propCategory || paramCategory || 'budget';
  
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Format the category for display
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const pageTitle = `${formattedCategory} Travel Tips`;
  const pageDescription = `Discover the best ${category} travel tips to help you plan your next adventure with confidence and save money.`;
  
  useEffect(() => {
    const controller = new AbortController(); // For cancelling fetch requests on unmount
    const signal = controller.signal;
    
    const fetchPosts = async () => {
      if (!loading) setLoading(true);
      setError(null);
      
      try {
        // Define search terms based on category
        const searchTerms = [];
        
        // Category-specific search terms
        switch(category) {
          case 'budget':
            searchTerms.push(
              'budget travel', 
              'budget tips', 
              'cheap travel', 
              'affordable travel', 
              'travel on a budget', 
              'money saving travel',
              'backpacking budget',
              'frugal travel',
              'budget destinations'
            );
            break;
          case 'luxury':
            searchTerms.push(
              'luxury travel',
              'premium travel',
              'high-end travel',
              'exclusive travel',
              'luxury destinations',
              'luxury hotels',
              'luxury experiences'
            );
            break;
          case 'family':
            searchTerms.push(
              'family travel',
              'travel with kids',
              'family-friendly travel',
              'family vacation tips',
              'traveling with children',
              'family destinations',
              'child-friendly travel'
            );
            break;
          case 'adventure':
            searchTerms.push(
              'adventure travel',
              'extreme travel',
              'outdoor adventures',
              'action travel',
              'adventure tourism',
              'hiking adventures',
              'adventure destinations'
            );
            break;
          case 'solo':
            searchTerms.push(
              'solo travel',
              'traveling alone',
              'solo traveler',
              'independent travel',
              'solo adventures',
              'solo safety',
              'solo travel tips'
            );
            break;
          default:
            searchTerms.push(
              `${category} travel`, 
              `${category} tips`, 
              `${category} guide`, 
              'travel tips'
            );
        }
        
        console.log(`Searching for ${category} travel tips with terms:`, searchTerms);
       
        
        // Fetch posts for main search terms first (in parallel)
        const fetchPromises = searchTerms.slice(0, 3).map(term => 
          getPosts({ 
            search: term,
            perPage: 9,
            signal
          })
        );
        
        const results = await Promise.all(fetchPromises);
        
        // Combine and deduplicate posts
        let fetchedPosts: any[] = [];
        for (const result of results) {
          if (result && result.length > 0) {
            const transformedPosts = result.map(transformPost).filter(Boolean);
            fetchedPosts = [...fetchedPosts, ...transformedPosts];
          }
        }
        
        // Remove duplicates by slug
        const uniquePosts = Array.from(new Map(fetchedPosts.map(post => [post.slug, post])).values());
        
        // If we don't have enough posts, try more search terms
        if (uniquePosts.length < 6 && searchTerms.length > 3) {
          const additionalTerms = searchTerms.slice(3);
          for (const term of additionalTerms) {
            if (uniquePosts.length >= 9) break;
            
            const additionalPosts = await getPosts({ 
              search: term,
              perPage: 9 - uniquePosts.length,
              signal
            });
            
            if (additionalPosts && additionalPosts.length > 0) {
              const transformedPosts = additionalPosts.map(transformPost).filter(Boolean);
              
              for (const post of transformedPosts) {
                if (!uniquePosts.some(p => p.slug === post.slug)) {
                  uniquePosts.push(post);
                }
              }
            }
          }
        }
        
        if (uniquePosts.length > 0) {
          console.log(`Found ${uniquePosts.length} posts for ${category} travel tips`);
          setPosts(uniquePosts);
          
          if (loading && uniquePosts.length > 0) {
            toast({
              title: `${formattedCategory} Travel Tips Loaded`,
              description: `Showing ${uniquePosts.length} travel tips for ${formattedCategory.toLowerCase()} travelers.`,
              duration: 3000,
            });
          }
        } else {
          console.log('No specific posts found, fetching general travel posts');
          const generalPosts = await getPosts({ 
            search: 'travel',
            perPage: 6,
            signal
          });
          
          if (generalPosts && generalPosts.length > 0) {
            const transformedPosts = generalPosts.map(transformPost).filter(Boolean);
            setPosts(transformedPosts);
            toast({
              description: `Showing general travel tips instead of specific ${category} tips.`,
              duration: 3000,
            });
          } else {
            setError('No travel tips found. Please check back later.');
            toast({
              variant: "destructive",
              title: "Content not available",
              description: `We couldn't find any travel tips for "${category}".`,
            });
          }
        }
      } catch (error) {
        console.error(`Error fetching ${category} travel tips:`, error);
        setError('Failed to load travel tips. Please try again later.');
        toast({
          variant: "destructive",
          title: "Error loading content",
          description: "There was a problem fetching travel tips. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
    
    // Cleanup function to abort fetch requests on unmount
    return () => {
      controller.abort();
    };
  }, [category, toast]); // Removed "loading" from dependencies to prevent repeated re-calls
  
  const getCategoryInfoBox = () => {
    switch(category) {
      case 'budget':
        return (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Budget Travel Essentials</h3>
            <p className="text-md">
              Traveling on a budget doesn't mean sacrificing experiences. 
              Discover smart ways to save money while making the most of your adventures,
              from finding affordable accommodations to eating like a local.
            </p>
          </div>
        );
      case 'luxury':
        return (
          <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Luxury Travel Experiences</h3>
            <p className="text-md">
              Indulge in premium travel experiences with our luxury travel tips.
              Find the best high-end destinations, accommodations, exclusive activities,
              and learn how to maximize loyalty programs for upgrades.
            </p>
          </div>
        );
      case 'family':
        return (
          <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Family-Friendly Adventures</h3>
            <p className="text-md">
              Family travel should be fun for everyone! Learn how to keep kids entertained
              while creating memorable experiences the whole family will cherish.
              Get tips on kid-friendly destinations and activities.
            </p>
          </div>
        );
      case 'adventure':
        return (
          <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Thrilling Adventures</h3>
            <p className="text-md">
              Push your limits with exciting adventure travel. From trekking remote mountains
              to diving deep seas, find inspiration for your next thrilling experience.
              Learn about safety precautions and gear essentials.
            </p>
          </div>
        );
      case 'solo':
        return (
          <div className="mt-6 bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Solo Travel Freedom</h3>
            <p className="text-md">
              Embarking on a journey alone can be transformative. Discover safety tips,
              social opportunities, and how to make the most of your solo adventures.
              Find destinations particularly welcoming to solo travelers.
            </p>
          </div>
        );
      default:
        return null;
    }
  };
  
  const relatedCategories = [
    { name: 'Budget', slug: 'budget' },
    { name: 'Luxury', slug: 'luxury' },
    { name: 'Family', slug: 'family' },
    { name: 'Adventure', slug: 'adventure' },
    { name: 'Solo', slug: 'solo' }
  ].filter(cat => cat.slug !== category);
  
  return (
    <Layout>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={`${category} travel tips, travel advice, travel blog, ${category} travel, travel planning, affordable travel, travel hacks, jeff honforloco`}
        type="website"
      />
      
      <div className="container max-w-7xl py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageTitle}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {pageDescription}
          </p>
          
          {getCategoryInfoBox()}
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {relatedCategories.map(cat => (
              <Link 
                key={cat.slug}
                to={`/travel/tips/${cat.slug}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-sm font-medium transition-colors"
              >
                {cat.name} Travel
              </Link>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Error</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error}
            </p>
            <Link to="/travel" className="btn-primary">
              Explore All Travel Content
            </Link>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We couldn't find any posts related to {category} travel tips at the moment.
            </p>
            <Link to="/travel" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
              Explore All Travel Content
            </Link>
          </div>
        )}
        
        {posts.length > 0 && (
          <div className="mt-12 text-center">
            <Link to="/travel" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
              Explore More Travel Content
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TravelTips;
