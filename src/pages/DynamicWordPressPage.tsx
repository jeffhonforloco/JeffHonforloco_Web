import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getPageBySlug, getPostsByCategory, getCategoryBySlug, getPosts, getPostBySlug } from '@/lib/wordpress';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import PostCard from '@/components/blog/PostCard';
import { Loader2 } from 'lucide-react';
import { calculateReadingTime, extractKeywords, getCanonicalUrl } from '@/lib/seo-utils';

const DynamicWordPressPage = () => {
  const { slug, categorySlug, storySlug, guideSlug, recommendationSlug, resourceSlug, affiliateSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageType, setPageType] = useState<'page' | 'category' | 'posts' | 'post' | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  const [pageKeywords, setPageKeywords] = useState<string[]>([]);

  // Extract path segments to determine what type of content to fetch
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const contentType = pathSegments[0];
  const contentSlug = slug || categorySlug || storySlug || guideSlug || recommendationSlug || resourceSlug || affiliateSlug || pathSegments[pathSegments.length - 1];

  // Extract category from query params if present
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');

  // Generate canonical URL
  const canonicalUrl = getCanonicalUrl(location.pathname);

  useEffect(() => {
    // Skip fetching if we're on a special route like /404
    if (location.pathname === '/404') {
      setLoading(false);
      return;
    }

    // Track page view
    console.log(`Dynamic page view: ${location.pathname}`);

    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching content for path: ${location.pathname}`);
        console.log(`Content type: ${contentType}, slug: ${contentSlug}`);
        
        // Special case for post URLs (handle /post/slug directly)
        if (contentType === 'post' && contentSlug) {
          console.log(`Trying to fetch post with slug: ${contentSlug}`);
          const post = await getPostBySlug(contentSlug);
          
          if (post) {
            console.log('Found post:', post.title?.rendered);
            setContent(post);
            setPageType('post');
            
            // Set SEO information
            const postTitle = post.title?.rendered || '';
            const postContent = post.content?.rendered || '';
            const postExcerpt = post.excerpt?.rendered || '';
            
            setPageTitle(postTitle);
            setPageDescription(postExcerpt.replace(/<[^>]*>/g, '').substring(0, 160));
            
            // Extract keywords
            if (postContent) {
              const keywords = extractKeywords(postContent, postTitle, '');
              setPageKeywords(keywords);
            }
            
            setLoading(false);
            return;
          }
        }
        
        // Special case for nested paths like travel/budget-tips
        if (pathSegments.length >= 2) {
          // Try with the full path first (minus leading slash)
          const fullPath = location.pathname.startsWith('/') ? location.pathname.substring(1) : location.pathname;
          console.log(`Trying to fetch page with full path: ${fullPath}`);
          const pageByFullPath = await getPageBySlug(fullPath);
          
          if (pageByFullPath) {
            console.log('Found page by full path:', pageByFullPath.title?.rendered);
            setContent(pageByFullPath);
            setPageType('page');
            
            const pageTitle = pageByFullPath.title?.rendered || '';
            const pageContent = pageByFullPath.content?.rendered || '';
            
            setPageTitle(pageTitle);
            setPageDescription(pageByFullPath.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 160) || '');
            
            if (pageContent) {
              const keywords = extractKeywords(pageContent, pageTitle, '');
              setPageKeywords(keywords);
            }
            
            setLoading(false);
            return;
          }
          
          // If not found, try with parent/child combination
          // For example, for /travel/budget-tips, try "travel-budget-tips"
          const combinedSlug = pathSegments.join('-');
          console.log(`Trying to fetch page with combined slug: ${combinedSlug}`);
          const pageByCombinedSlug = await getPageBySlug(combinedSlug);
          
          if (pageByCombinedSlug) {
            console.log('Found page by combined slug:', pageByCombinedSlug.title?.rendered);
            setContent(pageByCombinedSlug);
            setPageType('page');
            
            const pageTitle = pageByCombinedSlug.title?.rendered || '';
            const pageContent = pageByCombinedSlug.content?.rendered || '';
            
            setPageTitle(pageTitle);
            setPageDescription(pageByCombinedSlug.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 160) || '');
            
            if (pageContent) {
              const keywords = extractKeywords(pageContent, pageTitle, '');
              setPageKeywords(keywords);
            }
            
            setLoading(false);
            return;
          }
          
          // For travel/tips type pages, redirect to the dedicated TravelTips component
          if (pathSegments[0] === 'travel' && (pathSegments[1] === 'tips' || pathSegments[1] === 'budget-tips')) {
            const tipCategory = pathSegments[2] || (pathSegments[1] === 'budget-tips' ? 'budget' : '');
            if (tipCategory) {
              navigate(`/travel/tips/${tipCategory}`, { replace: true });
            } else {
              navigate('/travel/tips/general', { replace: true });
            }
            return;
          }
        }
        
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
          
          // Extract page title and description for SEO
          const pageTitle = pageResult.title?.rendered || pageResult.title || '';
          const pageContent = pageResult.content?.rendered || '';
          const pageExcerpt = pageResult.excerpt?.rendered || '';
          
          setPageTitle(pageTitle);
          setPageDescription(pageExcerpt.replace(/<[^>]*>/g, '').substring(0, 160));
          
          // Extract keywords from content
          if (pageContent) {
            const keywords = extractKeywords(pageContent, pageTitle, '');
            setPageKeywords(keywords);
          }
          
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
            
            // Set SEO information for category
            setPageTitle(category.name);
            setPageDescription(category.description || `Browse all posts in ${category.name}`);
            setPageKeywords([category.name.toLowerCase(), 'blog', 'articles', 'posts']);
            
            setLoading(false);
            return;
          }
        }

        // Special handling for common sections where we should display posts with specific types or tags
        if (contentType) {
          let sectionTitle = '';
          let searchQuery = '';
          let sectionDescription = '';
          
          switch (contentType) {
            case 'stories':
              sectionTitle = contentSlug ? `${contentSlug.replace(/-/g, ' ')} Stories` : 'Stories';
              searchQuery = 'story';
              sectionDescription = `Discover ${contentSlug ? contentSlug.replace(/-/g, ' ') + ' ' : ''}stories and personal experiences from Jeff HonForLoco.`;
              break;
            case 'guides':
              sectionTitle = contentSlug ? `${contentSlug.replace(/-/g, ' ')} Guides` : 'Guides';
              searchQuery = 'guide';
              sectionDescription = `Explore ${contentSlug ? contentSlug.replace(/-/g, ' ') + ' ' : ''}guides and tutorials to help you on your journey.`;
              break;
            case 'affiliate':
              sectionTitle = contentSlug ? `${contentSlug.replace(/-/g, ' ')} Resources` : 'Affiliate Resources';
              searchQuery = contentSlug || 'affiliate';
              sectionDescription = `Recommended ${contentSlug ? contentSlug.replace(/-/g, ' ') + ' ' : ''}products and services that Jeff personally uses and trusts.`;
              break;
            case 'recommendations':
              sectionTitle = contentSlug ? `${contentSlug.replace(/-/g, ' ')} Recommendations` : 'Recommendations';
              searchQuery = contentSlug || 'recommendation';
              sectionDescription = `Top ${contentSlug ? contentSlug.replace(/-/g, ' ') + ' ' : ''}recommendations and reviews from Jeff's personal experience.`;
              break;
            case 'resources':
              sectionTitle = contentSlug ? `${contentSlug.replace(/-/g, ' ')} Resources` : 'Resources';
              searchQuery = contentSlug || 'resource';
              sectionDescription = `Valuable ${contentSlug ? contentSlug.replace(/-/g, ' ') + ' ' : ''}resources and tools to help you succeed.`;
              break;
            case 'travel':
              sectionTitle = contentSlug ? `${contentSlug.replace(/-/g, ' ')} Travel` : 'Travel';
              searchQuery = contentSlug ? `${contentSlug} travel` : 'travel';
              sectionDescription = `Travel ${contentSlug ? contentSlug.replace(/-/g, ' ') + ' ' : ''}advice, tips, and stories to inspire your next adventure.`;
              break;
          }
          
          if (searchQuery) {
            console.log(`Fetching posts with search query: ${searchQuery}`);
            const fetchedPosts = await getPosts({ search: searchQuery, perPage: 10 });
            
            if (fetchedPosts && fetchedPosts.length > 0) {
              console.log(`Found ${fetchedPosts.length} posts for section ${sectionTitle}`);
              setPageTitle(sectionTitle);
              setPageDescription(sectionDescription);
              setPageKeywords([contentType, searchQuery, 'jeff honforloco', 'blog']);
              setPosts(fetchedPosts);
              setPageType('posts');
              setLoading(false);
              return;
            }
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
  }, [location.pathname, categoryParam, contentSlug, contentType, toast, navigate, pathSegments]);

  // Handle error state - Use useEffect for navigation to prevent render-phase updates
  useEffect(() => {
    if (error && !loading && location.pathname !== '/404') {
      navigate('/404', { replace: true });
    }
  }, [error, loading, navigate, location.pathname]);

  // Add structured data
  useEffect(() => {
    if (!loading && pageType && pageTitle) {
      let structuredData: any = null;
      
      if (pageType === 'page' || pageType === 'post') {
        structuredData = {
          '@context': 'https://schema.org',
          '@type': pageType === 'post' ? 'BlogPosting' : 'WebPage',
          name: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
        };
        
        if (pageType === 'post') {
          structuredData.datePublished = content.date;
          structuredData.dateModified = content.modified || content.date;
          structuredData.headline = pageTitle;
          structuredData.author = {
            '@type': 'Person',
            name: 'Jeff HonForLoco'
          };
        }
      } else if (pageType === 'category' || pageType === 'posts') {
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: posts.map((post, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `https://www.jeffhonforloco.com/post/${post.slug}`,
              name: post.title?.rendered || post.title,
            })),
          },
        };
      }
      
      if (structuredData) {
        // Remove any existing script tags with the same ID
        const existingScript = document.getElementById('dynamic-page-structured-data');
        if (existingScript) {
          existingScript.remove();
        }

        // Add the new script tag
        const script = document.createElement('script');
        script.id = 'dynamic-page-structured-data';
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
      
      // Clean up
      return () => {
        const script = document.getElementById('dynamic-page-structured-data');
        if (script) {
          script.remove();
        }
      };
    }
  }, [loading, pageType, pageTitle, pageDescription, canonicalUrl, posts, content]);

  // Handle loading state
  if (loading) {
    return (
      <Layout>
        <SEO title="Loading..." />
        <div className="container max-w-7xl py-12 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Render page content
  if (pageType === 'page' && content) {
    // Safely get the title and content
    const title = typeof content.title === 'string' ? content.title : content.title?.rendered || '';
    const contentHtml = typeof content.content === 'string' ? content.content : content.content?.rendered || '';
    
    return (
      <Layout>
        <SEO 
          title={title} 
          description={pageDescription}
          keywords={pageKeywords.join(', ')}
          canonical={canonicalUrl}
        />
        <div className="container max-w-4xl py-12">
          <h1 className="text-4xl font-bold mb-8" dangerouslySetInnerHTML={{ __html: title }} />
          <div 
            className="prose prose-lg dark:prose-invert max-w-none article-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />
        </div>
      </Layout>
    );
  }

  // Render post content directly in the dynamic page component
  if (pageType === 'post' && content) {
    // Use similar rendering as in the SinglePost component
    const title = typeof content.title === 'string' ? content.title : content.title?.rendered || '';
    const contentHtml = typeof content.content === 'string' ? content.content : content.content?.rendered || '';
    const excerpt = typeof content.excerpt === 'string' ? content.excerpt : content.excerpt?.rendered || '';
    const featuredMedia = content._embedded?.['wp:featuredmedia']?.[0];
    const featuredImage = featuredMedia?.source_url || '/placeholder.svg';
    
    return (
      <Layout>
        <SEO 
          title={title} 
          description={pageDescription}
          keywords={pageKeywords.join(', ')}
          canonical={canonicalUrl}
          image={featuredImage}
          publishedAt={content.date}
          type="article"
        />
        <article className="pt-12 pb-16">
          <div className="container max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: title }} />
            
            {featuredImage && (
              <figure className="mb-8 rounded-lg overflow-hidden">
                <img 
                  src={featuredImage} 
                  alt={title} 
                  className="w-full h-auto" 
                />
              </figure>
            )}
            
            <div 
              className="prose prose-lg dark:prose-invert max-w-none article-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }} 
            />
          </div>
        </article>
      </Layout>
    );
  }

  // Render category/archive page
  if (pageType === 'category' && content) {
    return (
      <Layout>
        <SEO 
          title={content.name} 
          description={pageDescription}
          keywords={pageKeywords.join(', ')}
          canonical={canonicalUrl}
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

  // Render posts section (for stories, guides, affiliates, etc.)
  if (pageType === 'posts' && posts.length > 0) {
    return (
      <Layout>
        <SEO 
          title={pageTitle} 
          description={pageDescription}
          keywords={pageKeywords.join(', ')}
          canonical={canonicalUrl}
        />
        <div className="container max-w-7xl py-12">
          <h1 className="text-4xl font-bold mb-8">{pageTitle}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // Return empty fragment if we're navigating away due to an error
  if (error) {
    return null;
  }

  // Fallback
  return (
    <Layout>
      <div className="container max-w-4xl py-12 text-center">
        <h1 className="text-4xl font-bold mb-8">Content Not Found</h1>
        <p className="text-lg mb-8">The page you are looking for doesn't exist or has been moved.</p>
      </div>
    </Layout>
  );
};

export default DynamicWordPressPage;
