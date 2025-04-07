
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, ChevronDown, Moon, Sun } from 'lucide-react';
import ProductSearch from '@/components/shop/ProductSearch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ThemeToggle from './ThemeToggle';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-white dark:bg-gray-900 animate-slide-down">
      <nav className="container-lg py-6 flex flex-col space-y-4">
        <div className="flex flex-col items-center text-center">
          {/* LifeStyle Section with Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="lifestyle" className="border-none">
              <AccordionTrigger className="text-lg font-semibold text-charcoal py-2">
                LifeStyle
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 flex flex-col">
                  <Link 
                    to="/blog?category=morning-routines" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Morning Routines
                  </Link>
                  <Link 
                    to="/blog?category=mindfulness-tips" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Mindfulness Tips
                  </Link>
                  <Link 
                    to="/blog?category=building-habits" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Building Habits
                  </Link>
                  <Link 
                    to="/blog" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    All Lifestyle Content
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Travel Adventures Section with Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="travel" className="border-none">
              <AccordionTrigger className="text-lg font-semibold text-charcoal py-2">
                Travel Adventures
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 flex flex-col">
                  <Link 
                    to="/explore-travel?category=budget-travel" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Budget Travel Tips
                  </Link>
                  <Link 
                    to="/explore-travel?category=mountain-getaways" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Outdoor Destinations
                  </Link>
                  <Link 
                    to="/explore-travel?category=adventure-travel" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Adventure Travel
                  </Link>
                  <Link 
                    to="/travel" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    All Travel Content
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Reviews Section with Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="reviews" className="border-none">
              <AccordionTrigger className="text-lg font-semibold text-charcoal py-2">
                Reviews
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 flex flex-col">
                  <Link 
                    to="/blog?category=gadget-reviews" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Best Gadgets
                  </Link>
                  <Link 
                    to="/blog?category=book-reviews" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Personal Growth Books
                  </Link>
                  <Link 
                    to="/blog?category=fitness-equipment" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Fitness Equipment
                  </Link>
                  <Link 
                    to="/blog" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    All Reviews
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Guides Section with Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="guides" className="border-none">
              <AccordionTrigger className="text-lg font-semibold text-charcoal py-2">
                Guides
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 flex flex-col">
                  <Link 
                    to="/blog?category=blogging-guides" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Starting a Blog
                  </Link>
                  <Link 
                    to="/blog?category=productivity" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Time Management Tips
                  </Link>
                  <Link 
                    to="/blog?category=remote-work" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    Remote Work Setups
                  </Link>
                  <Link 
                    to="/blog?category=how-to" 
                    className="text-lg font-medium text-charcoal w-full py-2"
                    onClick={onClose}
                  >
                    All Guides
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* More Section */}
          <details className="group border-b border-gray-200 py-2">
            <summary className="text-xl font-semibold flex cursor-pointer items-center justify-between py-2">
              <span>More</span>
              <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
            </summary>
            <div className="pb-3 pl-4 flex flex-col">
              {/* Stories Section */}
              <div className="mt-2 mb-1 font-medium text-gray-500">Stories:</div>
              <Link 
                to="/blog?category=solo-travel" 
                className="text-lg font-medium text-charcoal w-full py-2 pl-2"
                onClick={onClose}
              >
                Lessons from Solo Travel
              </Link>
              <Link 
                to="/blog?category=personal-growth" 
                className="text-lg font-medium text-charcoal w-full py-2 pl-2"
                onClick={onClose}
              >
                Overcoming Challenges
              </Link>
              <Link 
                to="/blog?category=blogging" 
                className="text-lg font-medium text-charcoal w-full py-2 pl-2"
                onClick={onClose}
              >
                Blogging Milestones
              </Link>
              
              {/* Resources Section */}
              <div className="mt-2 mb-1 font-medium text-gray-500">Resources:</div>
              <Link 
                to="/shop" 
                className="text-lg font-medium text-charcoal w-full py-2 pl-2"
                onClick={onClose}
              >
                Tools for Bloggers
              </Link>
              <Link 
                to="/shop" 
                className="text-lg font-medium text-charcoal w-full py-2 pl-2"
                onClick={onClose}
              >
                Travel Essentials
              </Link>
              <Link 
                to="/shop" 
                className="text-lg font-medium text-charcoal w-full py-2 pl-2"
                onClick={onClose}
              >
                Lifestyle Products
              </Link>
              
              {/* Info Pages */}
              <div className="mt-2 mb-1 font-medium text-gray-500">Info:</div>
              <Link 
                to="/about" 
                className="text-lg font-medium text-charcoal w-full py-2 pl-2"
                onClick={onClose}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-lg font-medium text-charcoal w-full py-2 pl-2"
                onClick={onClose}
              >
                Contact Us
              </Link>
              <Link 
                to="/privacy-policy" 
                className="text-lg font-medium text-charcoal w-full py-2 pl-2"
                onClick={onClose}
              >
                Privacy Policy
              </Link>
            </div>
          </details>
          
          {/* Shop Link */}
          <Link 
            to="/shop" 
            className="text-lg font-semibold text-charcoal dark:text-white flex items-center justify-center gap-2 w-full py-2"
            onClick={onClose}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Shop</span>
          </Link>
          
          {/* Theme Toggle */}
          <div className="w-full flex justify-center py-2 border-b border-gray-200 dark:border-gray-700">
            <ThemeToggle />
          </div>
          
          <div className="pt-2 w-full">
            <ProductSearch>
              <button 
                className="flex items-center justify-center text-charcoal dark:text-white w-full font-semibold"
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
