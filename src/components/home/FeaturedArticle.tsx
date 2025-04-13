import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
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
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFeaturedArticle = async () => {
      try {
        setLoading(true);
        setError(false);
        // For now, just get the first post
        const posts = await getPosts({ perPage: 1 });
        if (posts.length > 0) {
          const transformedPost = transformPost(posts[0]);
          if (transformedPost) {
            setFeaturedArticle(transformedPost);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching featured article:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticle();
  }, []);

  const fallbackArticle: Post = {
    id: 0,
    slug: 'example-post',
    title: 'Welcome to Jeff HonForLoco',
    excerpt: '<p>Explore insights, travel tips, and personal stories about growth, adventure, and making the most of every opportunity. Stay tuned for new content coming soon!</p>',
    content: '',
    category: 'Featured',
    categorySlug: 'featured',
    featuredImage: '/placeholder.jpg',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  if (loading) {
    return (
      <section className="py-16 bg-slate-50 border-b">
        <div className="container-lg">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-12 w-full mb-4" />
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-[400px] w-full rounded-lg mb-6" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-6" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
      </section>
    );
  }

  const articleToDisplay = (!error && featuredArticle) ? featuredArticle : fallbackArticle;

  return (
    <section className="py-16 bg-slate-50 border-b">
      <div className="container-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Link 
              to={`/category/${articleToDisplay.categorySlug}`}
              className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-sm uppercase tracking-wide"
            >
              {articleToDisplay.category}
            </Link>
            <span className="px-2 text-gray-500">•</span>
            <span className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {articleToDisplay.date}
            </span>
          </div>
          
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-6" dangerouslySetInnerHTML={{ __html: articleToDisplay.title }} />
          
          <Link to={`/post/${articleToDisplay.slug}`} className="block mb-6">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src={articleToDisplay.featuredImage} 
                alt={typeof articleToDisplay.title === 'string' ? articleToDisplay.title : 'Featured article'} 
                className="w-full h-auto object-cover transition-transform hover:scale-105 duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.jpg'; // Fallback image
                }}
              />
            </div>
          </Link>
          
          <div className="font-sans text-lg text-gray-600 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: articleToDisplay.excerpt }} />
          
          {error ? (
            <div className="text-sm text-gray-500 italic mb-4">
              Note: Placeholder content is displayed because WordPress content is currently unavailable.
            </div>
          ) : null}
          
          <Link to={`/post/${articleToDisplay.slug}`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md group">
              Continue Reading
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;
