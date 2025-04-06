
import React from 'react';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
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

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover-scale group">
      <Link to={`/post/${post.slug}`} className={`block relative ${imageSizeClass} overflow-hidden`}>
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute top-4 left-4">
          <Link 
            to={`/category/${post.categorySlug}`}
            className="bg-gold text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-90 transition-opacity"
          >
            {post.category}
          </Link>
        </div>
      </Link>
      
      <div className="p-6">
        <h3 className={`font-serif ${titleSizeClass} font-bold mb-2 line-clamp-2`}>
          <Link to={`/post/${post.slug}`} className="hover:text-gold transition-colors">
            {post.title}
          </Link>
        </h3>
        
        {size !== 'small' && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
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
  );
};

export default PostCard;
