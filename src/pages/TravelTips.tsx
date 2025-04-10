
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SEO from '../components/shared/SEO';
import PostCard from '../components/blog/PostCard';
import { getPosts, transformPost } from '@/lib/wordpress';
import { Skeleton } from '@/components/ui/skeleton';

interface TravelTipsProps {
  category?: string;
}

const TravelTips: React.FC<TravelTipsProps> = ({ category: propCategory }) => {
  const { category: paramCategory } = useParams<{ category?: string }>();
  const category = propCategory || paramCategory || 'budget';
  
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Format the category for display
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const pageTitle = `${formattedCategory} Travel Tips`;
  const pageDescription = `Discover the best ${category} travel tips to help you plan your next adventure with confidence and save money.`;
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
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
              'frugal travel'
            );
            break;
          case 'luxury':
            searchTerms.push(
              'luxury travel',
              'premium travel',
              'high-end travel',
              'exclusive travel',
              'luxury destinations'
            );
            break;
          case 'family':
            searchTerms.push(
              'family travel',
              'travel with kids',
              'family-friendly travel',
              'family vacation tips',
              'traveling with children'
            );
            break;
          case 'adventure':
            searchTerms.push(
              'adventure travel',
              'extreme travel',
              'outdoor adventures',
              'action travel',
              'adventure tourism'
            );
            break;
          case 'solo':
            searchTerms.push(
              'solo travel',
              'traveling alone',
              'solo traveler',
              'independent travel',
              'solo adventures'
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
        
        // Try each search term until we find some posts
        let fetchedPosts = [];
        for (const term of searchTerms) {
          console.log(`Searching for posts with term: ${term}`);
          const posts = await getPosts({ 
            search: term,
            perPage: 9
          });
          
          if (posts && posts.length > 0) {
            const transformedPosts = posts.map(transformPost).filter(Boolean);
            fetchedPosts = [...fetchedPosts, ...transformedPosts];
            
            // Remove duplicates by slug
            const uniquePosts = fetchedPosts.reduce((acc, current) => {
              const x = acc.find(item => item.slug === current.slug);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
            
            fetchedPosts = uniquePosts;
            
            if (fetchedPosts.length >= 6) {
              break; // We have enough posts, stop searching
            }
            // If we have some but not enough, continue searching but keep what we found
          }
        }
        
        // If we found at least some posts with our specific search terms
        if (fetchedPosts.length > 0) {
          console.log(`Found ${fetchedPosts.length} posts for ${category} travel tips`);
          setPosts(fetchedPosts);
        } else {
          // If still no posts, try general travel category as a fallback
          console.log('No specific posts found, fetching general travel posts');
          const generalPosts = await getPosts({ 
            search: 'travel',
            perPage: 6
          });
          
          if (generalPosts && generalPosts.length > 0) {
            fetchedPosts = generalPosts.map(transformPost).filter(Boolean);
            setPosts(fetchedPosts);
          } else {
            setError('No travel tips found. Please check back later.');
          }
        }
      } catch (error) {
        console.error(`Error fetching ${category} travel tips:`, error);
        setError('Failed to load travel tips. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [category]);
  
  // Get content for the special info box based on category
  const getCategoryInfoBox = () => {
    switch(category) {
      case 'budget':
        return (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-md">
              Traveling on a budget doesn't mean sacrificing experiences. 
              Discover smart ways to save money while making the most of your adventures.
            </p>
          </div>
        );
      case 'luxury':
        return (
          <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <p className="text-md">
              Indulge in premium travel experiences with our luxury travel tips.
              Find the best high-end destinations, accommodations and exclusive activities.
            </p>
          </div>
        );
      case 'family':
        return (
          <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-md">
              Family travel should be fun for everyone! Learn how to keep kids entertained
              while creating memorable experiences the whole family will cherish.
            </p>
          </div>
        );
      case 'adventure':
        return (
          <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <p className="text-md">
              Push your limits with exciting adventure travel. From trekking remote mountains
              to diving deep seas, find inspiration for your next thrilling experience.
            </p>
          </div>
        );
      case 'solo':
        return (
          <div className="mt-6 bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
            <p className="text-md">
              Embarking on a journey alone can be transformative. Discover safety tips,
              social opportunities, and how to make the most of your solo adventures.
            </p>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <Layout>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={`${category} travel tips, travel advice, travel blog, ${category} travel, travel planning, affordable travel, travel hacks`}
        type="website"
      />
      
      <div className="container max-w-7xl py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageTitle}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {pageDescription}
          </p>
          
          {getCategoryInfoBox()}
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
