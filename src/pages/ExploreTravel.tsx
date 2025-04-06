
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Compass, Globe, MapPin, Mountain, Palmtree } from 'lucide-react';
import Layout from '../components/layout/Layout';
import SEO from '../components/shared/SEO';
import PostCard from '../components/blog/PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { getCategoryBySlug, getPostsByCategory, getPosts, transformPost } from '../lib/wordpress';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import FeaturedDestinations, { getDestinationBySlug } from '../components/home/FeaturedDestinations';

const ExploreTravel = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const destinationSlug = searchParams.get('destination');
  const categoryParam = searchParams.get('category');
  
  const selectedDestination = destinationSlug ? getDestinationBySlug(destinationSlug) : null;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try fetching by category first
        const categorySlug = 'travel-adventures';
        console.log(`Attempting to fetch posts from category: ${categorySlug}`);
        
        const category = await getCategoryBySlug(categorySlug);
        
        if (category) {
          console.log(`Found category: ${category.name} with ${category.count} posts`);
          setCategory(category);
          
          // Fetch posts for this category
          const postsResult = await getPostsByCategory(categorySlug, currentPage, postsPerPage);
          const fetchedPosts = postsResult.posts;
          
          if (fetchedPosts && fetchedPosts.length > 0) {
            console.log(`Found ${fetchedPosts.length} posts in category`);
            const transformedPosts = fetchedPosts.map(transformPost);
            setPosts(transformedPosts);
            setTotalPages(Math.ceil(category.count / postsPerPage));
          } else {
            console.log('No posts found in category, falling back to all posts');
            // Fall back to all posts
            const fallbackPosts = await getPosts({ page: currentPage, perPage: postsPerPage });
            if (fallbackPosts.length > 0) {
              const transformedPosts = fallbackPosts.map(transformPost);
              setPosts(transformedPosts);
              setTotalPages(Math.ceil(10 / postsPerPage)); // Assuming at least 10 posts total
            } else {
              setPosts([]);
              setError('No travel posts found');
            }
          }
        } else {
          console.log('Category not found, falling back to all posts');
          // Category not found, fall back to all posts
          const fallbackPosts = await getPosts({ page: currentPage, perPage: postsPerPage });
          if (fallbackPosts.length > 0) {
            const transformedPosts = fallbackPosts.map(transformPost);
            setPosts(transformedPosts);
            setTotalPages(Math.ceil(10 / postsPerPage)); // Assuming at least 10 posts total
          } else {
            setPosts([]);
            setError('No travel posts found');
          }
        }
      } catch (error) {
        console.error('Error fetching travel posts:', error);
        setError('Failed to load travel posts. Please try again later.');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);

  const travelCategories = [
    { 
      icon: <Mountain className="h-8 w-8 text-gold" />, 
      name: "Mountain Getaways", 
      description: "Explore majestic peaks and hiking trails",
      slug: "mountain-getaways"
    },
    { 
      icon: <Palmtree className="h-8 w-8 text-gold" />, 
      name: "Beach Destinations", 
      description: "Discover pristine shores and coastal retreats",
      slug: "beach-destinations"
    },
    { 
      icon: <Compass className="h-8 w-8 text-gold" />, 
      name: "Adventure Travel", 
      description: "Thrilling experiences for the bold traveler",
      slug: "adventure-travel"
    },
    { 
      icon: <MapPin className="h-8 w-8 text-gold" />, 
      name: "City Exploration", 
      description: "Urban adventures and cultural experiences",
      slug: "city-exploration"
    }
  ];

  const handleCategoryClick = (categorySlug: string) => {
    setSearchParams({ category: categorySlug });
  };

  return (
    <Layout>
      <SEO 
        title={selectedDestination ? selectedDestination.name : "Explore Travel Adventures"} 
        description={selectedDestination ? selectedDestination.description : "Discover amazing travel destinations, adventure guides, and travel tips for your next journey."} 
        type="website"
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-sky-100 to-white dark:from-sky-900 dark:to-charcoal dark:text-white">
        <div className="container-lg">
          <h1 className="title-lg mb-4">
            {selectedDestination ? selectedDestination.name : "Explore Travel Adventures"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl text-lg">
            {selectedDestination ? selectedDestination.description : "Discover breathtaking destinations, practical travel tips, and unforgettable adventures to inspire your next journey."}
          </p>
          
          {/* Travel Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {travelCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="flex flex-col items-center text-center">
                  {category.icon}
                  <h3 className="font-bold text-lg mt-4 mb-2">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Destinations */}
      <FeaturedDestinations />
      
      {/* Travel Articles Section */}
      <section className="py-16 bg-offwhite dark:bg-gray-900 dark:text-white">
        <div className="container-lg">
          <h2 className="title-md mb-8">
            {category ? `Latest ${category.name} Articles` : 'Latest Travel Adventures'}
          </h2>
          
          {loading ? (
            // Loading skeletons
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="w-full aspect-video dark:bg-gray-700" />
                  <div className="p-6">
                    <Skeleton className="h-7 w-3/4 mb-2 dark:bg-gray-700" />
                    <Skeleton className="h-5 w-full mb-2 dark:bg-gray-700" />
                    <Skeleton className="h-5 w-full mb-4 dark:bg-gray-700" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20 dark:bg-gray-700" />
                      <Skeleton className="h-4 w-20 dark:bg-gray-700" />
                    </div>
                  </div>
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
              <h2 className="title-md mb-4">{error || "No travel adventure posts found"}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Check back later for exciting travel content or create some posts in the travel-adventures category.</p>
              <Link to="/blog" className="btn-primary">View All Blog Posts</Link>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                      aria-disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                      className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                      aria-disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ExploreTravel;
