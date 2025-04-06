
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

// Mock data (to be replaced with WordPress API data)
const featuredPosts: Post[] = [
  {
    id: 1,
    slug: 'italian-coastal-adventure',
    title: 'Discovering Hidden Gems Along the Italian Coast',
    excerpt: 'Explore the scenic coastal towns and secret beaches that most tourists never find in this journey through Italy\'s stunning coastline.',
    category: 'Travel',
    categorySlug: 'travel',
    featuredImage: 'https://images.unsplash.com/photo-1533606688190-a73cb4b14e22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'May 15, 2023'
  },
  {
    id: 2,
    slug: 'mindfulness-daily-routine',
    title: 'Incorporating Mindfulness Into Your Daily Routine',
    excerpt: 'Simple yet effective practices to bring awareness and presence into your everyday life, transforming ordinary moments into opportunities for growth.',
    category: 'Personal Growth',
    categorySlug: 'personal-growth',
    featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'April 28, 2023'
  },
  {
    id: 3,
    slug: 'sustainable-fashion-choices',
    title: 'Making Sustainable Fashion Choices Without Compromising Style',
    excerpt: 'Discover how to build an eco-friendly wardrobe that reflects your personal style while minimizing environmental impact.',
    category: 'Lifestyle',
    categorySlug: 'lifestyle',
    featuredImage: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    date: 'April 12, 2023'
  }
];

const FeaturedPosts = () => {
  return (
    <section className="py-20 bg-offwhite">
      <div className="container-lg">
        <div className="flex justify-between items-center mb-12">
          <h2 className="title-lg">Featured Stories</h2>
          <Link 
            to="/blog" 
            className="flex items-center text-charcoal hover:text-gold transition-colors"
          >
            View all posts <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover-scale group">
              <Link to={`/post/${post.slug}`} className="block relative aspect-video overflow-hidden">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
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
                  <Link to={`/post/${post.slug}`} className="hover:text-gold transition-colors">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
