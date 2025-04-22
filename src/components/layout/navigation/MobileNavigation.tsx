import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ThemeToggle from './ThemeToggle';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white dark:bg-gray-900  animate-slide-down max-h-screen overflow-y-auto ">
      <nav className="container-lg py-6 flex flex-col space-y-4">
        <div className="flex flex-col items-center text-center">

          {/* Home */}
          <Link
            to="/"
            className="text-lg font-medium text-charcoal dark:text-white w-full py-2"
            onClick={onClose}
          >
            Home
          </Link>

          {/* LifeStyle */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="lifestyle" className="border-none">
              <AccordionTrigger className="text-lg font-semibold text-charcoal dark:text-white py-2">
                LifeStyle
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 flex flex-col">
                  <Link to="/category/morning-routines" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Morning Routines</Link>
                  <Link to="/category/mindfulness-tips" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Mindfulness Tips</Link>
                  <Link to="/category/building-habits" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Building Habits</Link>
                  <Link to="/category/motivation-stories" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Motivation Stories</Link>
                  <Link to="/category/motivation-stories/overcoming-challenges" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Overcoming Challenges</Link>
                  <Link to="/category/lifestyle-growth" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">All Lifestyle Content</Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Travel Adventures */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="travel" className="border-none">
              <AccordionTrigger className="text-lg font-semibold text-charcoal dark:text-white py-2">
                Travel Adventures
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 flex flex-col">
                  <Link to="/travel/budget-tips" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Budget Travel Tips</Link>
                  <Link to="/travel/outdoor-destinations" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Outdoor Destinations</Link>
                  <Link to="/travel/backpacking-guides" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Backpacking Guides</Link>
                  <Link to="/travel" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">All Travel Content</Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Reviews */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="reviews" className="border-none">
              <AccordionTrigger className="text-lg font-semibold text-charcoal dark:text-white py-2">
                Reviews
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 flex flex-col">
                  <Link to="/category/best-gadgets" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Best Gadgets</Link>
                  <Link to="/category/personal-growth-books" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Personal Growth Books</Link>
                  <Link to="/category/fitness-equipment" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Fitness Equipment</Link>
                  <Link to="/category/product-reviews" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">All Reviews</Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Guides */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="guides" className="border-none">
              <AccordionTrigger className="text-lg font-semibold text-charcoal dark:text-white py-2">
                Guides
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 flex flex-col">
                  <Link to="/guides/starting-a-blog" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Starting a Blog</Link>
                  <Link to="/guides/time-management-tips" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Time Management Tips</Link>
                  <Link to="/guides/remote-work-setups" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Remote Work Setups</Link>
                  <Link to="/category/how-to-guides" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">All Guides</Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* More */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="more" className="border-none">
              <AccordionTrigger className="text-lg font-semibold text-charcoal dark:text-white py-2">
                More
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 flex flex-col">
                  {/* Stories */}
                  <Link className="text-sm font-medium text-gray-500 pt-2" to="/stories" onClick={onClose}>Stories</Link>
                  <Link to="/stories/solo-travel-lessons" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Lessons from Solo Travel</Link>
                  <Link to="/stories/overcoming-challenges" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Overcoming Challenges</Link>
                  <Link to="/stories/blogging-milestones" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Blogging Milestones</Link>

                  {/* Affiliate */}
                  <Link className="text-sm font-medium text-gray-500 pt-4" to="/affiliate" onClick={onClose}>Affiliate</Link>
                  <Link to="/affiliate/tools-for-bloggers" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Tools for Bloggers</Link>
                  <Link to="/affiliate/travel-essentials" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Travel Essentials</Link>
                  <Link to="/affiliate/exclusive-deals" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Exclusive Deals</Link>

                  {/* Recommendations */}
                  <Link className="text-sm font-medium text-gray-500 pt-4" to="/recommendation" onClick={onClose}>Recommendations</Link>
                  <Link to="/recommendations/nature-destinations" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Nature Destinations</Link>
                  <Link to="/recommendations/lifestyle-products" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Lifestyle Products</Link>
                  <Link to="/recommendations/blogging-resources" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Blogging Resources</Link>

                  {/* Resources */}
                  <Link className="text-sm font-medium text-gray-500 pt-4" to="/resources" onClick={onClose}>Resources</Link>
                  <Link to="/resources/productivity-apps" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Productivity Apps</Link>
                  <Link to="/resources/blogger-essentials" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Blogger Essentials</Link>
                  <Link to="/resources/budget-travel-tools" onClick={onClose} className="text-lg font-medium text-charcoal dark:text-white w-full py-2">Budget Travel Tools</Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Shop */}
          <Link
            to="/shop"
            className="text-lg font-medium text-charcoal dark:text-white w-full py-2 flex items-center justify-center gap-2"
            onClick={onClose}
          >
            <ShoppingBag className="h-5 w-5" />
            Shop
          </Link>

          {/* Theme Toggle */}
          <div className="pt-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;


















