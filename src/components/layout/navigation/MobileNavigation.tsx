
import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, ShoppingBag } from 'lucide-react';
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
        <div className="py-2">
          <p className="text-lg font-medium text-charcoal mb-2">Categories</p>
          <div className="pl-4 flex flex-col space-y-2">
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
          to="/about" 
          className="text-lg font-medium text-charcoal"
          onClick={onClose}
        >
          About
        </Link>
        
        <Link 
          to="/contact" 
          className="text-lg font-medium text-charcoal"
          onClick={onClose}
        >
          Contact
        </Link>
        
        {/* Explore Travel Link for Mobile */}
        <Link 
          to="/explore-travel" 
          className="text-lg font-medium text-charcoal flex items-center gap-2"
          onClick={onClose}
        >
          <Compass className="h-5 w-5" />
          <span>Explore Travel</span>
        </Link>
        
        {/* Shop Link for Mobile */}
        <Link 
          to="/shop" 
          className="text-lg font-medium text-charcoal flex items-center gap-2"
          onClick={onClose}
        >
          <ShoppingBag className="h-5 w-5" />
          <span>Shop</span>
        </Link>
        
        <div className="pt-2">
          <ProductSearch>
            <button 
              className="flex items-center text-charcoal"
              onClick={onClose}
            >
              <Search className="h-5 w-5 mr-2" />
              <span>Search</span>
            </button>
          </ProductSearch>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
