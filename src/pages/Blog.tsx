
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import PostCard from '../components/blog/PostCard';
import AdSection from '../components/home/AdSection';
import SEO from '../components/shared/SEO';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getPosts, transformPost } from '../lib/wordpress';
import { Skeleton } from '@/components/ui/skeleton';

interface TransformedPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  featuredImage: string;
  date: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<TransformedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts({
          page: currentPage,
          perPage: postsPerPage,
        });
        
        const transformedPosts = response.map(transformPost);
        setPosts(transformedPosts);
        
        // Get total pages from headers
        const wpTotalPages = parseInt(response.headers?.get('X-WP-TotalPages') || '1');
        setTotalPages(wpTotalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <Layout>
      <SEO 
        title="Blog" 
        description="Explore all blog posts covering travel, lifestyle, personal growth, health, and entertainment topics." 
      />
      
      <section className="pt-24 pb-10 bg-offwhite">
        <div className="container-lg">
          <h1 className="title-lg mb-2">Blog</h1>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Explore all articles covering travel, lifestyle, personal growth, health, and entertainment topics.
          </p>
        </div>
      </section>
      
      <section className="py-12 bg-white">
        <div className="container-lg">
          {loading ? (
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
          ) : (
            <>
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="title-md mb-4">No posts found</h2>
                  <p className="text-gray-600">Check back later for new content.</p>
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
            </>
          )}
        </div>
      </section>
      
      <AdSection />
    </Layout>
  );
};

export default Blog;
