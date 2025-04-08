
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SEO from '../components/shared/SEO';
import PostCard from '../components/blog/PostCard';
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import AdSection from '../components/home/AdSection';
import { getPostBySlug, getPosts, transformPost } from '../lib/wordpress';
import { Skeleton } from '@/components/ui/skeleton';

// Define transformed post interface
interface TransformedPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  featuredImage: string;
  date: string;
  rawDate: string;
}

const SinglePost = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<TransformedPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<TransformedPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await getPostBySlug(slug);
        
        if (!fetchedPost) {
          navigate('/404');
          return;
        }
        
        const transformedPost = transformPost(fetchedPost);
        setPost(transformedPost);
        
        // Fetch related posts from the same category
        const categoryId = fetchedPost._embedded?.['wp:term']?.[0]?.[0]?.id;
        if (categoryId) {
          const relatedPostsData = await getPosts({
            categories: [categoryId],
            perPage: 3,
          });
          
          // Filter out the current post
          const filteredRelatedPosts = relatedPostsData
            .filter(p => p.id !== fetchedPost.id)
            .map(transformPost);
          
          setRelatedPosts(filteredRelatedPosts);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug, navigate]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Post URL has been copied to clipboard.",
    });
  };
  
  const shareOnSocial = (platform: string) => {
    if (!post) return;
    
    let url = '';
    const postUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(post.title);
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank');
  };
  
  if (loading) {
    return (
      <Layout>
        <article className="pt-24 pb-16">
          <div className="container-lg">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-12 w-full mb-6" />
              <div className="flex justify-between mb-8">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-32" />
              </div>
              <Skeleton className="w-full aspect-[16/9] mb-10" />
              <div className="space-y-4 mb-12">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
          </div>
        </article>
      </Layout>
    );
  }
  
  if (!post) {
    return (
      <Layout>
        <div className="container-lg py-24 text-center">
          <h1 className="title-lg mb-4">Post Not Found</h1>
          <p className="mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn-primary">Return to Home</Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <SEO 
        title={post.title}
        description={post.excerpt}
        type="article"
        image={post.featuredImage}
        publishedAt={post.rawDate}
        category={post.category}
      />
      
      <article className="pt-24 pb-16 bg-enfroy-bg">
        {/* Post Header */}
        <header className="container-lg mb-10">
          <div className="max-w-4xl mx-auto">
            <Link 
              to={`/category/${post.categorySlug}`}
              className="inline-block bg-enfroy-primary text-white text-sm px-3 py-1 rounded-md mb-4 hover:bg-opacity-90 transition-opacity"
            >
              {post.category}
            </Link>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-enfroy-text leading-tight">{post.title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 text-enfroy-secondary">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center text-sm">
                    <span className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => shareOnSocial('facebook')}
                  className="p-2 bg-enfroy-accent rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => shareOnSocial('twitter')}
                  className="p-2 bg-enfroy-accent rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => shareOnSocial('linkedin')}
                  className="p-2 bg-enfroy-accent rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 bg-enfroy-accent rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Copy link to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Featured Image */}
        <div className="container-lg mb-10">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-md">
              <img 
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container-lg mb-12">
          <div className="max-w-4xl mx-auto">
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
        
        {/* Share & Tags */}
        <div className="container-lg border-t border-b border-enfroy-border py-6 mb-12">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center">
              <span className="mr-2 font-medium text-enfroy-text">Share:</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => shareOnSocial('facebook')}
                  className="p-2 bg-enfroy-accent rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => shareOnSocial('twitter')}
                  className="p-2 bg-enfroy-accent rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => shareOnSocial('linkedin')}
                  className="p-2 bg-enfroy-accent rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 bg-enfroy-accent rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Copy link to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ad Section */}
        <AdSection />
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="container-lg py-12 bg-white">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-enfroy-text">You Might Also Like</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <PostCard key={post.id} post={post} size="small" />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default SinglePost;
