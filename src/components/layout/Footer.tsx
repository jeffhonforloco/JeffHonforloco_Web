
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define our main categories for the footer
const footerCategories = [
  { id: 1, name: "Lifestyle & Growth", slug: "lifestyle-growth" },
  { id: 2, name: "Travel Adventures", slug: "travel-adventures" },
  { id: 3, name: "Product Reviews", slug: "product-reviews" },
  { id: 4, name: "How-To Guides", slug: "how-to-guides" },
  { id: 5, name: "Motivation & Stories", slug: "motivation-stories" }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="container-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="block mb-4">
              <img 
                src="/lovable-uploads/1b3ef5fa-016d-4cd5-9724-895a53b211a9.png" 
                alt="Jeff HonForLoco Logo" 
                className="h-20 mx-auto md:mx-0 mb-2" 
              />
              <p className="text-gray-300 text-xs text-center md:text-left italic">
                live bold. travel far. grow every day.
              </p>
            </Link>
            <p className="text-gray-300 mb-6">
              Exploring life through travel, lifestyle, and personal growth experiences.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
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
              {footerCategories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.slug}`}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-gold transition-colors">
                  View All Posts
                </Link>
              </li>
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
