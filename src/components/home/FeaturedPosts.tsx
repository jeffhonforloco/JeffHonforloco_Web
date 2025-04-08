
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        setLoading(true);
        const posts = await getPosts({ perPage: 6 });
        const transformedPosts = posts.map(transformPost).filter(Boolean) as Post[];
        setFeaturedPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-offwhite to-white">
      <div className="container-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div>
            <h2 className="title-lg mb-3">Featured Stories</h2>
            <p className="text-gray-600 text-lg max-w-2xl">Discover insights and adventures from my latest articles</p>
          </div>
          <Link 
            to="/blog" 
            className="mt-4 md:mt-0"
          >
            <Button variant="outline" className="group">
              View all posts 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeletons
            Array(6).fill(0).map((_, index) => (
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
            ))
          ) : featuredPosts.length > 0 ? (
            featuredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover-scale group">
                <Link to={`/post/${post.slug}`} className="block relative aspect-video overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={typeof post.title === 'string' ? post.title : 'Featured post'} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-white text-xs px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </Link>
                
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-2 line-clamp-2">
                    <Link to={`/post/${post.slug}`} className="hover:text-gold transition-colors" 
                         dangerouslySetInnerHTML={{ __html: post.title }} />
                  </h3>
                  
                  <div className="text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{post.date}</span>
                    <Link 
                      to={`/post/${post.slug}`} 
                      className="story-link text-gold"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p>No posts found. Check back later for new content.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
