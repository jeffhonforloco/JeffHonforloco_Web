import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getPageBySlug, getPostsByCategory, getCategoryBySlug, getPosts, getPostBySlug } from '@/lib/wordpress';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import PostCard from '@/components/blog/PostCard';
import { Loader2 } from 'lucide-react';
import { calculateReadingTime, extractKeywords, getCanonicalUrl } from '@/lib/seo-utils';
import { trackSectionView } from '@/utils/userEngagement';

const DynamicWordPressPage = () => {
  const { slug, categorySlug, storySlug, guideSlug, recommendationSlug, resourceSlug, affiliateSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageType, setPageType] = useState<'page' | 'category' | 'posts' | 'post' | 'story' | 'guide' | 'recommendation' | 'resource' | 'affiliate' | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  const [pageKeywords, setPageKeywords] = useState<string[]>([]);

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const contentType = pathSegments[0];
  const contentSlug = slug || categorySlug || storySlug || guideSlug || recommendationSlug || resourceSlug || affiliateSlug || pathSegments[pathSegments.length - 1];

  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');

  const canonicalUrl = getCanonicalUrl(location.pathname);

  console.log(`DynamicWordPressPage: Path: ${location.pathname}, Type: ${contentType}, Slug: ${contentSlug}`);

  useEffect(() => {
    if (location.pathname === '/404') {
      setLoading(false);
      return;
    }

    console.log(`Dynamic page view: ${location.pathname}`);

    try {
      if (contentType) {
        if (contentType === 'stories' || contentType === 'story') {
          trackSectionView('stories');
        } else if (contentType === 'affiliate') {
          trackSectionView('affiliate');
        } else if (contentType === 'recommendations' || contentType === 'recommendation') {
          trackSectionView('recommendations');
        } else if (contentType === 'resources' || contentType === 'resource') {
          trackSectionView('resources');
        }
      }
    } catch (error) {
      console.error('Error tracking section view:', error);
    }

    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching content for path: ${location.pathname}`);
        console.log(`Content type: ${contentType}, slug: ${contentSlug}`);
        
        if (['stories', 'story', 'affiliate', 'recommendations', 'recommendation', 'resources', 'resource'].includes(contentType)) {
          console.log(`Special content type detected: ${contentType}`);
          
          let sectionTitle = '';
          let searchQuery = '';
          let sectionDescription = '';
          let pageTypeValue: 'story' | 'affiliate' | 'recommendation' | 'resource' | 'posts' = 'posts';
          
          switch (contentType) {
            case 'stories':
            case 'story':
              sectionTitle = contentSlug ? `${contentSlug.replace(/-/g, ' ')} Stories` : 'Personal Stories';
              searchQuery = contentSlug || 'story, personal experience';
              sectionDescription = `Discover ${contentSlug ? contentSlug.replace(/-/g, ' ') + ' ' : ''}personal stories and experiences from Jeff HonForLoco.`;
              pageTypeValue = 'story';
              break;
              
            case 'affiliate':
              sectionTitle = contentSlug ? `${contentSlug.replace(/-/g, ' ')} Resources` : 'Affiliate Resources';
              searchQuery = contentSlug || 'affiliate';
              sectionDescription = `Recommended ${contentSlug ? contentSlug.replace(/-/g, ' ') + ' ' : ''}products and services that Jeff personally uses and trusts.`;
              pageTypeValue = 'affiliate';
              break;
              
            case 'recommendations':
            case 'recommendation':
              sectionTitle = contentSlug ? `${contentSlug.replace(/-/g, ' ')} Recommendations` : 'Recommendations';
              searchQuery = contentSlug || 'recommendation';
              sectionDescription = `Top ${contentSlug ? contentSlug.replace(/-/g, ' ') + ' ' : ''}recommendations and reviews from Jeff's personal experience.`;
              pageTypeValue = 'recommendation';
              break;
              
            case 'resources':
            case 'resource':
              sectionTitle = contentSlug ? `${contentSlug.replace(/-/g, ' ')} Resources` : 'Resources';
              searchQuery = contentSlug || 'resource';
              sectionDescription = `Valuable ${contentSlug ? contentSlug.replace(/-/g, ' ') + ' ' : ''}resources and tools to help you succeed.`;
              pageTypeValue = 'resource';
              break;
          }
          
          const specificPage = await getPageBySlug(`${contentType}/${contentSlug || ''}`);
          
          if (specificPage) {
            console.log(`Found specific page for ${contentType}/${contentSlug || ''}`);
            setContent(specificPage);
            setPageType('page');
            
            const safeTitle = specificPage.title?.rendered || specificPage.title || '';
            const safeContent = specificPage.content?.rendered || '';
            const safeExcerpt = specificPage.excerpt?.rendered || '';
            
            const titleText = typeof safeTitle === 'string' 
              ? safeTitle 
              : '';
                
            setPageTitle(titleText);
            
            const excerptText = typeof safeExcerpt === 'string' 
              ? safeExcerpt.substring(0, 160) 
              : safeExcerpt.replace?.(/<[^>]*>/g, '').substring(0, 160) || '';
                
            setPageDescription(excerptText);
            
            if (safeContent) {
              const contentText = typeof safeContent === 'string' 
                ? safeContent
                : '';
                  
              const keywords = extractKeywords(contentText, titleText, '');
              setPageKeywords(keywords);
            }
            
            setLoading(false);
            return;
          }
          
          console.log(`Fetching posts for ${contentType} with search query: ${searchQuery}`);
          const fetchedPosts = await getPosts({ 
            search: searchQuery, 
            perPage: 12,
            orderBy: 'date',
            order: 'desc'
          });
          
          if (fetchedPosts && fetchedPosts.length > 0) {
            console.log(`Found ${fetchedPosts.length} posts for section ${sectionTitle}`);
            setPageTitle(sectionTitle);
            setPageDescription(sectionDescription);
            setPageKeywords([contentType, searchQuery, 'jeff honforloco', 'blog']);
            setPosts(fetchedPosts);
            setPageType(pageTypeValue);
            setLoading(false);
            return;
          } else {
            console.log(`No posts found for ${contentType}. Creating default content.`);
            
            setPageTitle(sectionTitle);
            setPageDescription(sectionDescription);
            setPageKeywords([contentType, 'jeff honforloco', 'blog']);
            setPageType(pageTypeValue);
            setPosts([]);
            
            setContent({
              title: { rendered: sectionTitle },
              content: { rendered: `<p>${sectionDescription}</p><p>Content for this section is coming soon. Check back later for updates!</p>` }
            });
            
            setLoading(false);
            return;
          }
        }
        
        if (contentType === 'post' && contentSlug) {
          console.log(`Trying to fetch post with slug: ${contentSlug}`);
          const post = await getPostBySlug(contentSlug);
          
          if (post) {
            console.log('Found post:', post.title?.rendered);
            setContent(post);
            setPageType('post');
            
            const postTitle = post.title?.rendered || '';
            const postContent = post.content?.rendered || '';
            const postExcerpt = post.excerpt?.rendered || '';
            
            setPageTitle(postTitle);
            setPageDescription(postExcerpt.replace(/<[^>]*>/g, '').substring(0, 160));
            
            if (postContent) {
              const keywords = extractKeywords(postContent, postTitle, '');
              setPageKeywords(keywords);
            }
            
            setLoading(false);
            return;
          }
        }
        
        if (pathSegments.length >= 2) {
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
        
        let pageResult;
        
        if (contentSlug) {
          pageResult = await getPageBySlug(contentSlug);
        }
        
        if (!pageResult && contentType && contentSlug && contentType !== contentSlug) {
          pageResult = await getPageBySlug(`${contentType}/${contentSlug}`);
        }
        
        if (!pageResult && location.pathname) {
          const fullPath = location.pathname.startsWith('/') ? location.pathname.substring(1) : location.pathname;
          pageResult = await getPageBySlug(fullPath);
        }
        
        if (pageResult) {
          console.log('Found page:', pageResult.title?.rendered || pageResult.title);
          setContent(pageResult);
          setPageType('page');
          
          const pageTitle = pageResult.title?.rendered || pageResult.title || '';
          const pageContent = pageResult.content?.rendered || '';
          const pageExcerpt = pageResult.excerpt?.rendered || '';
          
          setPageTitle(pageTitle);
          setPageDescription(pageExcerpt.replace(/<[^>]*>/g, '').substring(0, 160));
          
          if (pageContent) {
            const keywords = extractKeywords(pageContent, pageTitle, '');
            setPageKeywords(keywords);
          }
          
          setLoading(false);
          return;
        }
        
        let categoryToUse = categoryParam || contentSlug;
        
        if (categoryToUse) {
          console.log(`Trying as category: ${categoryToUse}`);
          const { category, posts: categoryPosts } = await getPostsByCategory(categoryToUse);
          
          if (category) {
            console.log('Found category:', category.name);
            setContent(category);
            setPosts(categoryPosts);
            setPageType('category');
            
            setPageTitle(category.name);
            setPageDescription(category.description || `Browse all posts in ${category.name}`);
            setPageKeywords([category.name.toLowerCase(), 'blog', 'articles', 'posts']);
            
            setLoading(false);
            return;
          }
        }
        
        if (contentType) {
          let sectionTitle = '';
          let searchQuery = '';
          let sectionDescription = '';
          
          switch (contentType) {
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

  useEffect(() => {
    if (error && !loading && location.pathname !== '/404') {
      navigate('/404', { replace: true });
    }
  }, [error, loading, navigate, location.pathname]);

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
      } else if (['category', 'posts', 'story', 'affiliate', 'recommendation', 'resource'].includes(pageType)) {
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
        const existingScript = document.getElementById('dynamic-page-structured-data');
        if (existingScript) {
          existingScript.remove();
        }

        const script = document.createElement('script');
        script.id = 'dynamic-page-structured-data';
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
      
      return () => {
        const script = document.getElementById('dynamic-page-structured-data');
        if (script) {
          script.remove();
        }
      };
    }
  }, [loading, pageType, pageTitle, pageDescription, canonicalUrl, posts, content]);

  useEffect(() => {
    try {
      if (typeof slug === 'string') {
        const normalizedSlug = slug.replace(/\//g, '-');
        trackSectionView(normalizedSlug);
      }
    } catch (error) {
      console.error('Error tracking section view:', error);
    }
  }, [slug]);

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

  if (['story', 'affiliate', 'recommendation', 'resource'].includes(pageType as string) && posts.length > 0) {
    let sectionTitle = pageTitle;
    let sectionDescription = pageDescription;
    let sectionIcon = null;
    
    switch (pageType) {
      case 'story':
        sectionIcon = "📖";
        break;
      case 'affiliate':
        sectionIcon = "🔗";
        break;
      case 'recommendation':
        sectionIcon = "👍";
        break;
      case 'resource':
        sectionIcon = "🛠️";
        break;
    }
    
    return (
      <Layout>
        <SEO 
          title={pageTitle} 
          description={pageDescription}
          keywords={pageKeywords.join(', ')}
          canonical={canonicalUrl}
        />
        <div className="container max-w-7xl py-12">
          <div className="text-center mb-12">
            {sectionIcon && <div className="text-4xl mb-4">{sectionIcon}</div>}
            <h1 className="text-4xl font-bold mb-4">{sectionTitle}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{sectionDescription}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (pageType === 'page' && content) {
    const titleContent = content.title || {};
    const title = typeof titleContent === 'string' 
      ? titleContent 
      : typeof titleContent.rendered === 'string'
        ? titleContent.rendered 
        : '';
        
    const contentBody = content.content || {};
    const contentHtml = typeof contentBody === 'string' 
      ? contentBody 
      : typeof contentBody.rendered === 'string'
        ? contentBody.rendered 
        : '';
    
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

  if (pageType === 'post' && content) {
    const titleContent = content.title || {};
    const title = typeof titleContent === 'string' 
      ? titleContent 
      : typeof titleContent.rendered === 'string'
        ? titleContent.rendered 
        : '';
        
    const contentBody = content.content || {};
    const contentHtml = typeof contentBody === 'string' 
      ? contentBody 
      : typeof contentBody.rendered === 'string'
        ? contentBody.rendered 
        : '';
        
    const excerptContent = content.excerpt || {};
    const excerpt = typeof excerptContent === 'string' 
      ? excerptContent 
      : typeof excerptContent.rendered === 'string'
        ? excerptContent.rendered 
        : '';
        
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

  if (error) {
    return null;
  }

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
