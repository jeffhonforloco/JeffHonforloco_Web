
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface PostCardProps {
  post: {
    id: number;
    slug: string;
    title: string | { rendered: string };
    excerpt: string | { rendered: string };
    featuredImage: string;
    category: string;
    categorySlug: string;
    date: string;
  };
  size?: 'small' | 'medium' | 'large';
}

const PostCard: React.FC<PostCardProps> = ({ post, size = 'medium' }) => {
  const imageSizeClass = {
    small: 'aspect-[4/3]',
    medium: 'aspect-video',
    large: 'aspect-[16/10]',
  }[size];

  const titleSizeClass = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl md:text-3xl',
  }[size];

  // Handle both string and object formats for title and excerpt
  const title = typeof post.title === 'string' ? post.title : post.title.rendered;
  const excerpt = typeof post.excerpt === 'string' ? post.excerpt : post.excerpt.rendered;

  return (
    <article className="article-card">
      <Link to={`/post/${post.slug}`} className={`block relative ${imageSizeClass} overflow-hidden`}>
        <img 
          src={post.featuredImage} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
        <div className="absolute top-4 left-4">
          <Link 
            to={`/category/${post.categorySlug}`}
            className="article-category"
          >
            {post.category}
          </Link>
        </div>
      </Link>
      
      <div className="p-6">
        <h3 className={`font-serif ${titleSizeClass} font-bold mb-3 line-clamp-2 hover:text-blue-600 transition-colors`}>
          <Link to={`/post/${post.slug}`} dangerouslySetInnerHTML={{ __html: title }} />
        </h3>
        
        {size !== 'small' && (
          <p className="text-gray-700 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: excerpt }} />
        )}
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {post.date}
          </span>
          <Link 
            to={`/post/${post.slug}`} 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
