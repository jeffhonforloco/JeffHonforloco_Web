
import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../lib/wordpress';

interface Category {
  id: number;
  name: string;
  slug: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        // Filter out categories with no posts and limit to top 5
        const filteredCategories = fetchedCategories
          .filter(category => category.count > 0)
          .slice(0, 5);
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);
  
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="container-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="font-serif text-2xl font-bold mb-4 inline-block">
              Jeff HonForLoco
            </Link>
            <p className="text-gray-300 mb-6">
              Exploring life through travel, lifestyle, and personal growth experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="hover:text-gold transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" className="hover:text-gold transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="col-span-1">
            <h3 className="font-serif text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.slug}`}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-serif text-lg font-semibold mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="font-serif text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to get the latest posts and updates.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                required
              />
              <button 
                type="submit" 
                className="bg-gold text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
              >
                Subscribe <Mail className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Jeff HonForLoco. All rights reserved.</p>
          <p className="mt-2">
            Designed and developed with <span className="text-red-500">❤</span> for optimal performance and user experience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
