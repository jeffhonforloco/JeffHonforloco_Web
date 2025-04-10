
import React, { useEffect, useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPosts, transformPost } from '../../lib/wordpress';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

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

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const fetchFeaturedPosts = useCallback(async () => {
    try {
      setLoading(true);
      const posts = await getPosts({ perPage: 6 });
      const transformedPosts = posts.map(transformPost).filter(Boolean) as Post[];
      setFeaturedPosts(transformedPosts);
      setVisiblePosts(transformedPosts.slice(0, postsPerPage));
    } catch (error) {
      console.error('Error fetching featured posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedPosts();
  }, [fetchFeaturedPosts]);

  // Load more posts
  const loadMorePosts = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const nextPosts = featuredPosts.slice(0, endIndex);
    setVisiblePosts(nextPosts);
    setCurrentPage(nextPage);
  };

  // Memoize the post cards to prevent unnecessary re-renders
  const renderPostCard = useCallback((post: Post) => (
    <article 
      key={post.id} 
      className="bg-white rounded-lg shadow-md overflow-hidden hover-scale group transform transition-all duration-500 hover:-translate-y-1"
    >
      <Link to={`/post/${post.slug}`} className="block relative aspect-video overflow-hidden">
        <img 
          src={post.featuredImage} 
          alt={typeof post.title === 'string' ? post.title : 'Featured post'} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gold text-white text-xs px-3 py-1 rounded-full transition-all duration-300 group-hover:bg-blue-600">
            {post.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors duration-300">
          <Link to={`/post/${post.slug}`} 
               dangerouslySetInnerHTML={{ __html: post.title }} />
        </h3>
        
        <div className="text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{post.date}</span>
          <Link 
            to={`/post/${post.slug}`} 
            className="story-link text-gold group-hover:text-blue-600 transition-colors duration-300"
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  ), []);

  return (
    <section className="py-24 bg-gradient-to-b from-offwhite to-white">
      <div className="container-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div>
            <div className="relative inline-block mb-3">
              <h2 className="title-lg relative z-10">Featured Stories</h2>
              <div className="absolute -bottom-2 left-0 w-1/2 h-3 bg-gold/20 -z-10"></div>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl">Discover insights and adventures from my latest articles</p>
          </div>
          <Link 
            to="/blog" 
            className="mt-4 md:mt-0"
          >
            <Button variant="outline" className="group border-gold text-gold hover:bg-gold hover:text-white">
              View all posts 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeletons with shimmer effect
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                <div className="animate-pulse">
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
                {/* Shimmer effect */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
            ))
          ) : visiblePosts.length > 0 ? (
            visiblePosts.map(renderPostCard)
          ) : (
            <div className="col-span-3 text-center py-10">
              <p>No posts found. Check back later for new content.</p>
            </div>
          )}
        </div>
        
        {/* Load more button */}
        {!loading && featuredPosts.length > visiblePosts.length && (
          <div className="mt-12 text-center">
            <Button 
              onClick={loadMorePosts}
              variant="outline" 
              className="border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300"
            >
              Load more stories
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
