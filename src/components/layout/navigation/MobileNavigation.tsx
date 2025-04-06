
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import ProductSearch from '@/components/shop/ProductSearch';
import { mainCategories } from '../HeaderData';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-white animate-slide-down">
      <nav className="container-lg py-6 flex flex-col space-y-4">
        <div className="flex flex-col items-center text-center">
          {/* About Link - Now First */}
          <Link 
            to="/about" 
            className="text-lg font-medium text-charcoal w-full py-2"
            onClick={onClose}
          >
            About
          </Link>
          
          {/* Categories - Now Second */}
          <div className="py-2 w-full">
            <p className="text-lg font-medium text-charcoal mb-2">Categories</p>
            <div className="flex flex-col space-y-2">
              {mainCategories.map((category) => (
                <Link 
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="text-charcoal hover:text-gold transition-colors"
                  onClick={onClose}
                >
                  {category.name}
                </Link>
              ))}
              <Link 
                to="/blog"
                className="text-charcoal font-medium hover:text-gold transition-colors"
                onClick={onClose}
              >
                View All Posts
              </Link>
            </div>
          </div>
          
          <Link 
            to="/contact" 
            className="text-lg font-medium text-charcoal w-full py-2"
            onClick={onClose}
          >
            Contact
          </Link>
          
          {/* Shop Link for Mobile */}
          <Link 
            to="/shop" 
            className="text-lg font-medium text-charcoal flex items-center justify-center gap-2 w-full py-2"
            onClick={onClose}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Shop</span>
          </Link>
          
          <div className="pt-2 w-full">
            <ProductSearch>
              <button 
                className="flex items-center justify-center text-charcoal w-full"
                onClick={onClose}
              >
                <Search className="h-5 w-5 mr-2" />
                <span>Search</span>
              </button>
            </ProductSearch>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
