
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PostCard from '../components/blog/PostCard';
import AdSection from '../components/home/AdSection';
import SEO from '../components/shared/SEO';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Mock data - will be replaced with WordPress API data
const categories = {
  'travel': {
    name: 'Travel',
    description: 'Adventures, destinations, and travel tips from around the world.',
    featuredImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  'lifestyle': {
    name: 'Lifestyle',
    description: 'Fashion, wellness, food, and all aspects of modern living.',
    featuredImage: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
  },
  'personal-growth': {
    name: 'Personal Growth',
    description: 'Insights and practices for personal development and well-being.',
    featuredImage: 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
  },
  'health': {
    name: 'Health',
    description: 'Tips, research, and experiences related to physical and mental health.',
    featuredImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  'entertainment': {
    name: 'Entertainment',
    description: 'Reviews, recommendations, and discussions about movies, music, and more.',
    featuredImage: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
};

// Mock posts for each category
const postsByCategory = {
  'travel': [
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
      id: 6,
      slug: 'japan-food-guide',
      title: 'A Foodie\'s Guide to Japan: Beyond Sushi and Ramen',
      excerpt: 'Discover Japan\'s lesser-known culinary treasures from regional specialties to hidden local favorites that most tourists never experience.',
      category: 'Travel',
      categorySlug: 'travel',
      featuredImage: 'https://images.unsplash.com/photo-1464093515883-ec948246accb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      date: 'February 18, 2023'
    },
    {
      id: 7,
      slug: 'morocco-vibrant-adventure',
      title: 'Morocco: A Vibrant Journey Through Color and Culture',
      excerpt: 'From the bustling markets of Marrakech to the serene beauty of the Sahara, Morocco offers a sensory adventure like no other.',
      category: 'Travel',
      categorySlug: 'travel',
      featuredImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
      date: 'January 22, 2023'
    }
  ],
  'lifestyle': [
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
  ],
  'personal-growth': [
    {
      id: 2,
      slug: 'mindfulness-daily-routine',
      title: 'Incorporating Mindfulness Into Your Daily Routine',
      excerpt: 'Simple yet effective practices to bring awareness and presence into your everyday life, transforming ordinary moments into opportunities for growth.',
      category: 'Personal Growth',
      categorySlug: 'personal-growth',
      featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      date: 'April 28, 2023'
    }
  ],
  'health': [
    {
      id: 4,
      slug: 'bali-wellness-retreat',
      title: 'My Transformative Experience at a Bali Wellness Retreat',
      excerpt: 'How a week-long wellness retreat in Bali changed my perspective on self-care and helped me establish healthier habits.',
      category: 'Health',
      categorySlug: 'health',
      featuredImage: 'https://images.unsplash.com/photo-1571323511805-9d5202be5366?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      date: 'March 20, 2023'
    }
  ],
  'entertainment': [
    {
      id: 5,
      slug: 'summer-blockbusters-2023',
      title: 'Summer Blockbusters 2023: Which Ones Are Worth Watching?',
      excerpt: 'A comprehensive review of this summer\'s biggest movies, helping you decide which are worth your time and money.',
      category: 'Entertainment',
      categorySlug: 'entertainment',
      featuredImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      date: 'March 5, 2023'
    }
  ]
};

const CategoryPage = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  
  // State for pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 6;
  
  // Get category data
  const category = categories[slug as keyof typeof categories];
  
  // Get posts for the category
  const posts = postsByCategory[slug as keyof typeof postsByCategory] || [];
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  if (!category) {
    return (
      <Layout>
        <div className="container-lg py-24 text-center">
          <h1 className="title-lg mb-4">Category Not Found</h1>
          <p className="mb-6">The category you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">Return to Home</Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <SEO 
        title={category.name} 
        description={category.description} 
      />
      
      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-gradient-to-r from-charcoal to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
          <img 
            src={category.featuredImage} 
            alt={category.name}
            className="object-cover w-full h-full" 
          />
        </div>
        
        <div className="container-lg relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="title-xl mb-4">{category.name}</h1>
            <p className="text-lg text-gray-100">
              {category.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Posts */}
      <section className="py-12 bg-white">
        <div className="container-lg">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md border bg-white text-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Previous page"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === i + 1
                            ? 'bg-gold text-white'
                            : 'bg-white text-charcoal border'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md border bg-white text-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Next page"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="title-md mb-4">No posts found</h2>
              <p className="text-gray-600 mb-6">There are no posts in this category yet.</p>
              <Link to="/" className="btn-primary">Return to Home</Link>
            </div>
          )}
        </div>
      </section>
      
      <AdSection />
    </Layout>
  );
};

export default CategoryPage;
