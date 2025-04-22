
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import NavigationItem from './NavigationItem';
import CartButton from './CartButton';
import ProductSearch from '@/components/shop/ProductSearch';
import { mainCategories, navigationLinks } from '../HeaderData';
import ThemeToggle from './ThemeToggle';

const DesktopNavigation = () => {
  return (
    <nav className="hidden md:flex items-center justify-end w-full space-x-6">
      {/* LifeStyle Link with Dropdown */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent px-0 font-semibold text-base">LifeStyle</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-2 p-4">
                <NavigationItem 
                  title="Morning Routines" 
                  href="/category/morning-routines"
                />
                <NavigationItem 
                  title="Mindfulness Tips" 
                  href="/category/mindfulness-tips"
                />
                <NavigationItem 
                  title="Building Habits" 
                  href="/category/building-habits"
                />
                <NavigationItem 
                  title="Motivation Stories" 
                  href="/category/motivation-stories"
                />
                <NavigationItem 
                  title="Overcoming Challenges" 
                  href="/category/motivation-stories/overcoming-challenges"
                />
                <NavigationItem 
                  title="All Lifestyle Content" 
                  href="/category/lifestyle-growth"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Travel Adventures Link with Dropdown */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent px-0 font-semibold text-base">Travel Adventures</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-2 p-4">
                <NavigationItem 
                  title="Budget Travel Tips" 
                  href="/travel/budget-tips"
                />
                <NavigationItem 
                  title="Outdoor Destinations" 
                  href="/travel/outdoor-destinations"
                />
                <NavigationItem 
                  title="Backpacking Guides" 
                  href="/travel/backpacking-guides"
                />
                <NavigationItem 
                  title="All Travel Content" 
                  href="/travel"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Reviews Link with Dropdown */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent px-0 font-semibold text-base">Reviews</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-2 p-4">
                <NavigationItem 
                  title="Best Gadgets" 
                  href="/category/best-gadgets"
                />
                <NavigationItem 
                  title="Personal Growth Books" 
                  href="/category/personal-growth-books"
                />
                <NavigationItem 
                  title="Fitness Equipment" 
                  href="/category/fitness-equipment"
                />
                <NavigationItem 
                  title="All Reviews" 
                  href="/category/product-reviews"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Guides Link with Dropdown */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent px-0 font-semibold text-base">Guides</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-2 p-4">
                <NavigationItem 
                  title="Starting a Blog" 
                  href="/guides/starting-a-blog"
                />
                <NavigationItem 
                  title="Time Management Tips" 
                  href="/guides/time-management-tips"
                />
                <NavigationItem 
                  title="Remote Work Setups" 
                  href="/guides/remote-work-setups"
                />
                <NavigationItem 
                  title="All Guides" 
                  href="/category/how-to-guides"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* More Link - This could be a dropdown for additional content */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent px-0 font-semibold text-base">More</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-2 p-4">
                <li className="pt-2">
                  <Link className="text-sm font-medium leading-none mb-2 text-gray-500" to="/stories">Stories</Link>
                  <ul className="pl-2">
                    <NavigationItem 
                      title="Lessons from Solo Travel" 
                      href="/stories/solo-travel-lessons"
                    />
                    <NavigationItem 
                      title="Overcoming Challenges" 
                      href="/stories/overcoming-challenges"
                    />
                    <NavigationItem 
                      title="Blogging Milestones" 
                      href="/stories/blogging-milestones"
                    />
                  </ul>
                </li>
                <li className="pt-2">
                  <Link className="text-sm font-medium leading-none mb-2 text-gray-500" to="/affiliate">Affiliate</Link>
                  <ul className="pl-2">
                    <NavigationItem 
                      title="Tools for Bloggers" 
                      href="/affiliate/tools-for-bloggers"
                    />
                    <NavigationItem 
                      title="Travel Essentials" 
                      href="/affiliate/travel-essentials"
                    />
                    <NavigationItem 
                      title="Exclusive Deals" 
                      href="/affiliate/exclusive-deals"
                    />
                  </ul>
                </li>
                <li className="pt-2">
                  <Link className="text-sm font-medium leading-none mb-2 text-gray-500" to="/recommendations">Recommendations</Link>
                  <ul className="pl-2">
                    <NavigationItem 
                      title="Nature Destinations" 
                      href="/recommendations/nature-destinations"
                    />
                    <NavigationItem 
                      title="Lifestyle Products" 
                      href="/recommendations/lifestyle-products"
                    />
                    <NavigationItem 
                      title="Blogging Resources" 
                      href="/recommendations/blogging-resources"
                    />
                  </ul>
                </li>
                <li className="pt-2">
                  <Link className="text-sm font-medium leading-none mb-2 text-gray-500" to="/resources">Resources</Link>
                  <ul className="pl-2">
                    <NavigationItem 
                      title="Productivity Apps" 
                      href="/resources/productivity-apps"
                    />
                    <NavigationItem 
                      title="Blogger Essentials" 
                      href="/resources/blogger-essentials"
                    />
                    <NavigationItem 
                      title="Budget Travel Tools" 
                      href="/resources/budget-travel-tools"
                    />
                  </ul>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Shop Link */}
      <Link to="/shop" className="nav-link flex items-center gap-1 font-semibold text-base">
        <ShoppingBag className="h-5 w-5" />
        <span>Shop</span>
      </Link>
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Cart */}
      <CartButton />
      
      <ProductSearch />
    </nav>
  );
};

export default DesktopNavigation;
