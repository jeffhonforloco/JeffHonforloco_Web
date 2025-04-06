
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import PostCard from '../components/blog/PostCard';
import AdSection from '../components/home/AdSection';
import SEO from '../components/shared/SEO';
import { ArrowLeft, ArrowRight, Compass, MapPin, Mountain, Palmtree } from 'lucide-react';
import { getCategoryBySlug, getPostsByCategory, transformPost } from '../lib/wordpress';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Travel = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Fetch posts from the "travel-adventures" category
        const { posts: fetchedPosts, category: fetchedCategory } = await getPostsByCategory('travel-adventures', currentPage, postsPerPage);
        
        if (fetchedPosts.length > 0) {
          const transformedPosts = fetchedPosts.map(transformPost);
          setPosts(transformedPosts);
          setCategory(fetchedCategory);
          
          // For pagination
          setTotalPages(Math.ceil(fetchedCategory?.count || 0 / postsPerPage));
        } else {
          // If no posts found in travel-adventures, fall back to all posts
          console.log('No travel adventure posts found, falling back to regular posts');
          const fallbackPosts = await getPosts({ page: currentPage, perPage: postsPerPage });
          const transformedPosts = fallbackPosts.map(transformPost);
          setPosts(transformedPosts);
          setTotalPages(Math.ceil(fallbackPosts.length / postsPerPage));
        }
      } catch (error) {
        console.error('Error fetching travel posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);

  const travelCategories = [
    { icon: <Mountain className="h-8 w-8 text-gold" />, name: "Mountain Getaways", description: "Explore majestic peaks and hiking trails" },
    { icon: <Palmtree className="h-8 w-8 text-gold" />, name: "Beach Destinations", description: "Discover pristine shores and coastal retreats" },
    { icon: <Compass className="h-8 w-8 text-gold" />, name: "Adventure Travel", description: "Thrilling experiences for the bold traveler" },
    { icon: <MapPin className="h-8 w-8 text-gold" />, name: "City Exploration", description: "Urban adventures and cultural experiences" }
  ];

  return (
    <Layout>
      <SEO 
        title="Explore Travel Adventures" 
        description="Discover amazing travel destinations, adventure guides, and travel tips for your next journey." 
        type="website"
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-sky-100 to-white">
        <div className="container-lg">
          <h1 className="title-lg mb-4">Explore Travel Adventures</h1>
          <p className="text-gray-600 mb-8 max-w-2xl text-lg">
            Discover breathtaking destinations, practical travel tips, and unforgettable adventures to inspire your next journey.
          </p>
          
          {/* Travel Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {travelCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center p-4">
                    {category.icon}
                    <h3 className="font-bold text-lg mt-4 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Travel Articles Section */}
      <section className="py-12 bg-white">
        <div className="container-lg">
          <h2 className="title-md mb-8">
            {category ? `Latest ${category.name} Articles` : 'Latest Travel Adventures'}
          </h2>
          
          {loading ? (
            // Loading skeletons
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="w-full aspect-video" />
                  <div className="p-6">
                    <Skeleton className="h-7 w-3/4 mb-2" />
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-5 w-full mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
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
              <h2 className="title-md mb-4">No travel adventure posts found</h2>
              <p className="text-gray-600 mb-6">Check back later for exciting travel content.</p>
              <Link to="/blog" className="btn-primary">View All Blog Posts</Link>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border bg-white text-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === i + 1
                        ? 'bg-gold text-white'
                        : 'bg-white text-charcoal border'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border bg-white text-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>
      
      <AdSection />
    </Layout>
  );
};

export default Travel;
