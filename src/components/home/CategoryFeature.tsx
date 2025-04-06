
import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
}

const categories: Category[] = [
  {
    name: 'Travel',
    slug: 'travel',
    description: 'Adventures, destinations, and travel tips from around the world.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Fashion, wellness, food, and all aspects of modern living.',
    image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
  },
  {
    name: 'Personal Growth',
    slug: 'personal-growth',
    description: 'Insights and practices for personal development and well-being.',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
  },
  {
    name: 'Health',
    slug: 'health',
    description: 'Tips, research, and experiences related to physical and mental health.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Reviews, recommendations, and discussions about movies, music, and more.',
    image: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
];

const CategoryFeature = () => {
  return (
    <section className="py-20">
      <div className="container-lg">
        <h2 className="title-lg text-center mb-4">Explore Categories</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Dive into diverse topics spanning travel, lifestyle, personal growth, health, and entertainment. Find inspiration across multiple interests.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={`/category/${category.slug}`}
              className="group rounded-lg overflow-hidden shadow-md bg-white hover-scale"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={category.image} 
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
                <p className="text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFeature;
