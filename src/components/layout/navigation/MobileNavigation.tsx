
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import ProductSearch from '@/components/shop/ProductSearch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
          {/* About Link */}
          <Link 
            to="/about" 
            className="text-lg font-medium text-charcoal w-full py-2"
            onClick={onClose}
          >
            About
          </Link>
          
          {/* LifeStyle Section with Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="lifestyle" className="border-none">
              <AccordionTrigger className="text-lg font-medium text-charcoal py-2">
                LifeStyle
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 flex flex-col">
                  <Link 
                    to="/category/morning-routines" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Morning Routines
                  </Link>
                  <Link 
                    to="/category/mindfulness-tips" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Mindfulness Tips
                  </Link>
                  <Link 
                    to="/category/building-habits" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Building Habits
                  </Link>
                  <Link 
                    to="/category/lifestyle-growth" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    All Lifestyle Content
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Travel Link */}
          <Link 
            to="/travel" 
            className="text-lg font-medium text-charcoal w-full py-2"
            onClick={onClose}
          >
            Travel
          </Link>
          
          {/* Reviews Link */}
          <Link 
            to="/category/product-reviews" 
            className="text-lg font-medium text-charcoal w-full py-2"
            onClick={onClose}
          >
            Reviews
          </Link>
          
          {/* Guides Link */}
          <Link 
            to="/category/how-to-guides" 
            className="text-lg font-medium text-charcoal w-full py-2"
            onClick={onClose}
          >
            Guides
          </Link>
          
          {/* More Link - Expand to show additional links */}
          <details className="w-full">
            <summary className="text-lg font-medium text-charcoal w-full py-2 cursor-pointer">
              More
            </summary>
            <div className="pl-4 flex flex-col">
              <Link 
                to="/" 
                className="text-lg font-medium text-charcoal w-full py-2"
                onClick={onClose}
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="text-lg font-medium text-charcoal w-full py-2"
                onClick={onClose}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="text-lg font-medium text-charcoal w-full py-2"
                onClick={onClose}
              >
                Contact
              </Link>
              <Link 
                to="/category/motivation-stories" 
                className="text-lg font-medium text-charcoal w-full py-2"
                onClick={onClose}
              >
                Motivation & Stories
              </Link>
            </div>
          </details>
          
          {/* Shop Link */}
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
