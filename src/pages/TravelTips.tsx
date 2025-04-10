
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SEO from '../components/shared/SEO';
import PostCard from '../components/blog/PostCard';
import { getPosts } from '@/lib/wordpress';
import { Skeleton } from '@/components/ui/skeleton';

interface TravelTipsProps {
  category?: string;
}

const TravelTips: React.FC<TravelTipsProps> = ({ category: propCategory }) => {
  const { category: paramCategory } = useParams<{ category?: string }>();
  const category = propCategory || paramCategory || 'budget';
  
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Format the category for display
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const pageTitle = `${formattedCategory} Travel Tips`;
  const pageDescription = `Discover the best ${category} travel tips to help you plan your next adventure with confidence and save money.`;
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Fetch posts related to this travel category
        const searchTerms = [`${category} travel`, `${category} tips`, 'travel tips'];
        
        // Try each search term until we find some posts
        let fetchedPosts = [];
        for (const term of searchTerms) {
          console.log(`Searching for posts with term: ${term}`);
          fetchedPosts = await getPosts({ 
            search: term,
            perPage: 9
          });
          
          if (fetchedPosts.length > 0) {
            break;
          }
        }
        
        setPosts(fetchedPosts);
      } catch (error) {
        console.error(`Error fetching ${category} travel tips:`, error);
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
            <p>
              Please check back later or explore our other travel content.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TravelTips;
