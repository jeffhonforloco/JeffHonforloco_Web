
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { getPosts, transformPost } from '@/lib/wordpress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

const TrendingArticles = () => {
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        // In a real app, you might have a different endpoint for trending posts
        // For now, we'll just get the latest posts
        const posts = await getPosts({ perPage: 4, page: 2 });
        const transformedPosts = posts.map(transformPost).filter(Boolean) as Post[];
        setTrendingPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <section className="py-24 bg-charcoal text-white">
      <div className="container-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-6 w-6 text-gold" />
              <h2 className="title-lg">Trending Now</h2>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl">Articles capturing readers' attention</p>
          </div>
          <Link to="/blog" className="mt-4 md:mt-0">
            <Button variant="outline" className="group bg-transparent border-white text-white hover:bg-white/10">
              More articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <Skeleton className="h-5 w-1/3 mb-4 bg-gray-700" />
                  <Skeleton className="h-8 w-full mb-2 bg-gray-700" />
                  <Skeleton className="h-8 w-4/5 mb-4 bg-gray-700" />
                  <Skeleton className="h-4 w-1/4 bg-gray-700" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {trendingPosts.map((post, index) => (
              <Card 
                key={post.id} 
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all hover:-translate-y-1 duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-gold text-sm font-bold">{`#${index + 1}`}</span>
                    <span className="ml-2 text-xs text-gray-400">{post.category}</span>
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold mb-3 line-clamp-2">
                    <Link to={`/post/${post.slug}`} className="hover:text-gold transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{post.date}</span>
                    <Link 
                      to={`/post/${post.slug}`} 
                      className="text-gold hover:underline"
                    >
                      Read
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingArticles;
