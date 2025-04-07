
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getPageBySlug, getPostsByCategory, getCategoryBySlug } from '@/lib/wordpress';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import PostCard from '@/components/blog/PostCard';
import { Loader2 } from 'lucide-react';

const DynamicWordPressPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageType, setPageType] = useState<'page' | 'category' | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  // Extract category from query params if present
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // First try to fetch as a page
        const pageResult = await getPageBySlug(slug || '');
        
        if (pageResult) {
          setContent(pageResult);
          setPageType('page');
          setLoading(false);
          return;
        }
        
        // If not found as page, try as category
        if (categoryParam) {
          const { category, posts: categoryPosts } = await getPostsByCategory(categoryParam);
          
          if (category) {
            setContent(category);
            setPosts(categoryPosts);
            setPageType('category');
            setLoading(false);
            return;
          }
        } else {
          // Try to fetch as a category using the slug
          const { category, posts: categoryPosts } = await getPostsByCategory(slug || '');
          
          if (category) {
            setContent(category);
            setPosts(categoryPosts);
            setPageType('category');
            setLoading(false);
            return;
          }
        }
        
        // If we get here, nothing was found
        setError(`The requested content was not found.`);
        toast({
          title: "Content not found",
          description: `We couldn't find the content you requested.`,
          variant: "destructive",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("There was an error loading the content. Please try again later.");
        toast({
          title: "Error",
          description: "There was an error loading the content. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [slug, categoryParam, toast]);

  // Handle loading state
  if (loading) {
    return (
      <Layout>
        <div className="container max-w-7xl py-12 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Handle error state
  if (error) {
    navigate('/404');
    return null;
  }

  // Render page content
  if (pageType === 'page' && content) {
    return (
      <Layout>
        <SEO 
          title={content.title.rendered} 
          description={`${content.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160)}...`}
        />
        <div className="container max-w-4xl py-12">
          <h1 className="text-4xl font-bold mb-8" dangerouslySetInnerHTML={{ __html: content.title.rendered }} />
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content.content.rendered }} 
          />
        </div>
      </Layout>
    );
  }

  // Render category/archive page
  if (pageType === 'category' && content) {
    return (
      <Layout>
        <SEO 
          title={content.name} 
          description={content.description || `Browse all posts in ${content.name}`}
        />
        <div className="container max-w-7xl py-12">
          <h1 className="text-4xl font-bold mb-4">{content.name}</h1>
          {content.description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{content.description}</p>
          )}
          
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl">No posts found in this category.</p>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // Fallback (shouldn't reach here due to error handling)
  return null;
};

export default DynamicWordPressPage;
