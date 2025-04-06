
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PostCard from '../components/blog/PostCard';
import AdSection from '../components/home/AdSection';
import SEO from '../components/shared/SEO';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getCategoryBySlug, getPostsByCategory, transformPost } from '../lib/wordpress';
import { Skeleton } from '@/components/ui/skeleton';

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  featuredImage: string;
  date: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const CategoryPage = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const { posts: fetchedPosts, category: fetchedCategory } = await getPostsByCategory(slug, currentPage, postsPerPage);
        
        if (!fetchedCategory) {
          setLoading(false);
          return;
        }
        
        setCategory({
          id: fetchedCategory.id,
          name: fetchedCategory.name,
          slug: fetchedCategory.slug,
          description: fetchedCategory.description
        });
        
        const transformedPosts = fetchedPosts.map(transformPost);
        setPosts(transformedPosts);
        
        // Calculate total pages based on post count
        setTotalPages(Math.ceil(fetchedCategory.count / postsPerPage));
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryData();
  }, [slug, currentPage]);
  
  if (loading) {
    return (
      <Layout>
        <section className="relative pt-24 pb-20 bg-gradient-to-r from-charcoal to-gray-800 text-white">
          <div className="container-lg relative z-10">
            <Skeleton className="h-12 w-48 mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl" />
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <div className="flex justify-between mt-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
  
  if (!category) {
    return (
      <Layout>
        <div className="container-lg py-24 text-center">
          <h1 className="title-lg mb-4">Category Not Found</h1>
          <p className="mb-6">The category you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">Return to Home</Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <SEO 
        title={category.name} 
        description={category.description} 
      />
      
      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-gradient-to-r from-charcoal to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
          {/* Fallback image in case there's no category image */}
          <img 
            src={`https://images.unsplash.com/photo-1600775508114-5c30cf911a40?auto=format&fit=crop&w=2000&q=80`}
            alt={category.name}
            className="object-cover w-full h-full" 
          />
        </div>
        
        <div className="container-lg relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="title-xl mb-4">{category.name}</h1>
            <p className="text-lg text-gray-100">
              {category.description || `Explore the latest ${category.name} posts and articles.`}
            </p>
          </div>
        </div>
      </section>
      
      {/* Posts */}
      <section className="py-12 bg-white">
        <div className="container-lg">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              
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
          ) : (
            <div className="text-center py-12">
              <h2 className="title-md mb-4">No posts found</h2>
              <p className="text-gray-600 mb-6">There are no posts in this category yet.</p>
              <Link to="/" className="btn-primary">Return to Home</Link>
            </div>
          )}
        </div>
      </section>
      
      <AdSection />
    </Layout>
  );
};

export default CategoryPage;
