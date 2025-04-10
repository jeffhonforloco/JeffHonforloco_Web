
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
        // First try searching for posts with category in the title
        console.log(`Searching for posts with category: ${category}`);
        let searchTerms = [`${category} travel`, `${category} tips`, 'travel tips'];
        
        // Try each search term until we find some posts
        let fetchedPosts = [];
        for (const term of searchTerms) {
          console.log(`Searching for posts with term: ${term}`);
          const posts = await getPosts({ 
            search: term,
            perPage: 9
          });
          
          if (posts && posts.length > 0) {
            fetchedPosts = posts.map(transformPost);
            break;
          }
        }
        
        if (fetchedPosts.length === 0) {
          // If still no posts, try general travel category
          console.log('No specific posts found, fetching general travel posts');
          const generalPosts = await getPosts({ 
            search: 'travel',
            perPage: 6
          });
          
          if (generalPosts && generalPosts.length > 0) {
            fetchedPosts = generalPosts.map(transformPost);
          } else {
            setError('No travel tips found. Please check back later.');
          }
        }
        
        setPosts(fetchedPosts);
      } catch (error) {
        console.error(`Error fetching ${category} travel tips:`, error);
        setError('Failed to load travel tips. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [category]);
  
  return (
    <Layout>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={`${category} travel tips, travel advice, travel blog, budget travel, travel planning`}
        type="website"
      />
      
      <div className="container max-w-7xl py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageTitle}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {pageDescription}
          </p>
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
      </div>
    </Layout>
  );
};

export default TravelTips;
