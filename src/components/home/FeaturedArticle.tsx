
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';
import { getPosts, transformPost } from '@/lib/wordpress';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  featuredImage: string;
  date: string;
}

const FeaturedArticle = () => {
  const [featuredArticle, setFeaturedArticle] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArticle = async () => {
      try {
        setLoading(true);
        // For now, just get the first post
        const posts = await getPosts({ perPage: 1 });
        if (posts.length > 0) {
          const transformedPost = transformPost(posts[0]);
          setFeaturedArticle(transformedPost);
        }
      } catch (error) {
        console.error('Error fetching featured article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticle();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container-lg">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <Skeleton className="h-8 w-1/3 mb-4" />
              <Skeleton className="h-12 w-full mb-2" />
              <Skeleton className="h-12 w-4/5 mb-6" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-4/5 mb-6" />
              <Skeleton className="h-10 w-36" />
            </div>
            <div className="lg:w-1/2">
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredArticle) {
    return null;
  }

  return (
    <section className="py-24 bg-white">
      <div className="container-lg">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-gold" />
              <span className="text-gold font-medium">Editor's Pick</span>
            </div>
            
            <h2 className="title-lg mb-6">
              {featuredArticle.title}
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 line-clamp-4">
              {featuredArticle.excerpt}
            </p>
            
            <Link to={`/post/${featuredArticle.slug}`}>
              <Button className="bg-gold hover:bg-gold/90 group">
                Read full article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Link to={`/post/${featuredArticle.slug}`}>
                <img 
                  src={featuredArticle.featuredImage} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-700 aspect-[4/3]" 
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;
