
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
  const title = typeof post.title === 'string' ? post.title : post.title?.rendered || '';
  const excerpt = typeof post.excerpt === 'string' ? post.excerpt : post.excerpt?.rendered || '';
  const cleanTitle = title.replace(/<[^>]*>/g, '') || 'Unnamed Post';
  const cleanExcerpt = excerpt || '';

  // Use a placeholder image if featuredImage is not available
  const imageUrl = post.featuredImage || '/placeholder.svg';

  return (
    <article className="article-card group bg-white dark:bg-gray-800 rounded-lg overflow-hidden  shadow-md hover:shadow-lg transition-all duration-300">
      <Link to={`/post/${post.slug}`} className={`block relative ${imageSizeClass} overflow-hidden`}>
        <img 
          src={imageUrl} 
          alt={cleanTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute top-4 left-4">
          <Link 
            to={`/category/${post.categorySlug}`}
            className="bg-gold px-3 py-1 text-xs font-medium text-white rounded-full hover:bg-gold/90 transition-colors"
          >
            {post.category || 'Uncategorized'}
          </Link>
        </div>
      </Link>
      
      <div className="p-6">
        <h3 className={`font-serif ${titleSizeClass} font-bold mb-3 line-clamp-2 hover:text-blue-600 transition-colors`}>
          <Link to={`/post/${post.slug}`} dangerouslySetInnerHTML={{ __html: cleanTitle }} />
        </h3>
        
        {size !== 'small' && (
          <div className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: cleanExcerpt }} />
        )}
        
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {post.date}
          </span>
          <Link 
            to={`/post/${post.slug}`} 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
