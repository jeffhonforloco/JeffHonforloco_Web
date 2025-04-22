
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  path: string;
}

// Define our official categories with descriptions
const officialCategories = [
  {
    name: "Lifestyle & Growth",
    slug: "lifestyle-growth",
    path: "/category/lifestyle-growth",
    description: "Explore morning routines, mindfulness practices, and habit-building strategies for personal development.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Travel Adventures",
    slug: "travel-adventures",
    path: "/travel",
    description: "Discover budget travel tips, outdoor destinations, and backpacking guides for your next adventure.",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
  {
    name: "Product Reviews",
    slug: "product-reviews",
    path: "/category/product-reviews",
    description: "Honest reviews of the best gadgets, personal growth books, fitness equipment, and more.",
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    name: "How-To Guides",
    slug: "how-to-guides",
    path: "/guides",
    description: "Practical guides on starting a blog, managing your time, setting up remote work, and more.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Stories & Motivation",
    slug: "motivation-stories",
    path: "/stories",
    description: "Inspiring stories from solo travel experiences, overcoming challenges, and blogging milestones.",
    image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Resources & Tools",
    slug: "resources-tools",
    path: "/resources",
    description: "Curated collection of productivity apps, budget travel tools, and essential resources for bloggers.",
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Affiliate Picks",
    slug: "affiliate-picks",
    path: "/affiliate",
    description: "Selected tools for bloggers, travel essentials, and exclusive deals I personally recommend.",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Top Recommendations",
    slug: "top-recommendations",
    path: "/recommendations",
    description: "My favorite nature destinations, lifestyle products, and blogging resources worth checking out.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  }
];

const CategoryFeature = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Instead of fetching from WordPress, we'll use our predefined categories
    // You can still fetch from WordPress once these categories are set up there
    setLoading(true);
    
    const formattedCategories = officialCategories.map((cat, index) => ({
      id: index + 1,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      path: cat.path
    }));
    
    // Only show up to 6 categories on the home page
    setCategories(formattedCategories.slice(0, 6));
    setLoading(false);
    
    console.log('CategoryFeature: Categories loaded');
  }, []);

  return (
    <section className="py-20">
      <div className="container-lg">
        <h2 className="title-lg text-center mb-4">Explore Categories</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Dive into diverse topics spanning travel, lifestyle, personal growth, and more. Find inspiration and practical advice for your journey.
        </p>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="p-6">
                  <Skeleton className="h-6 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category.id}
                to={category.path}
                className="group rounded-lg overflow-hidden shadow-md bg-white hover-scale"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={officialCategories[index].image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h3 className="font-serif text-xl font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No categories found. Check back later for new content.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryFeature;
