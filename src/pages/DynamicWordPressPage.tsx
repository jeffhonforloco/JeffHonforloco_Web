
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getPageBySlug, getPostsByCategory, getCategoryBySlug } from '@/lib/wordpress';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import PostCard from '@/components/blog/PostCard';
import { Loader2 } from 'lucide-react';

const DynamicWordPressPage = () => {
  const { slug, categorySlug, storySlug, guideSlug, recommendationSlug, resourceSlug, affiliateSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageType, setPageType] = useState<'page' | 'category' | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  // Extract path segments to determine what type of content to fetch
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const contentType = pathSegments[0];
  const contentSlug = slug || categorySlug || storySlug || guideSlug || recommendationSlug || resourceSlug || affiliateSlug || pathSegments[pathSegments.length - 1];

  // Extract category from query params if present
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching content for path: ${location.pathname}`);
        console.log(`Content type: ${contentType}, slug: ${contentSlug}`);
        
        // Try to fetch as a page first
        let pageResult;
        
        // Try with the direct slug
        if (contentSlug) {
          pageResult = await getPageBySlug(contentSlug);
        }
        
        // If not found and we have a content type and slug, try with a combined path
        if (!pageResult && contentType && contentSlug && contentType !== contentSlug) {
          pageResult = await getPageBySlug(`${contentType}/${contentSlug}`);
        }
        
        // If still not found, try with the full path minus the leading slash
        if (!pageResult && location.pathname) {
          const fullPath = location.pathname.startsWith('/') ? location.pathname.substring(1) : location.pathname;
          pageResult = await getPageBySlug(fullPath);
        }
        
        if (pageResult) {
          console.log('Found page:', pageResult.title?.rendered || pageResult.title);
          setContent(pageResult);
          setPageType('page');
          setLoading(false);
          return;
        }
        
        // If not found as page, try as category
        let categoryToUse = categoryParam || contentSlug;
        
        if (categoryToUse) {
          console.log(`Trying as category: ${categoryToUse}`);
          const { category, posts: categoryPosts } = await getPostsByCategory(categoryToUse);
          
          if (category) {
            console.log('Found category:', category.name);
            setContent(category);
            setPosts(categoryPosts);
            setPageType('category');
            setLoading(false);
            return;
          }
        }
        
        // If we get here, nothing was found
        console.error(`Content not found for ${location.pathname}`);
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
  }, [location.pathname, categoryParam, contentSlug, contentType, toast]);

  // Handle error state - Use useEffect for navigation to prevent render-phase updates
  useEffect(() => {
    if (error && !loading) {
      navigate('/not-found', { replace: true });
    }
  }, [error, loading, navigate]);

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

  // Render page content
  if (pageType === 'page' && content) {
    // Safely get the title and content
    const pageTitle = content.title?.rendered || '';
    const pageContent = content.content?.rendered || '';
    const pageExcerpt = content.excerpt?.rendered || '';
    
    return (
      <Layout>
        <SEO 
          title={pageTitle} 
          description={`${pageExcerpt.replace(/<[^>]*>/g, '').substring(0, 160)}...`}
        />
        <div className="container max-w-4xl py-12">
          <h1 className="text-4xl font-bold mb-8" dangerouslySetInnerHTML={{ __html: pageTitle }} />
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent }} 
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

  // Return empty fragment if we're navigating away due to an error
  if (error) {
    return null;
  }

  // Fallback (shouldn't reach here due to error handling)
  return null;
};

export default DynamicWordPressPage;
