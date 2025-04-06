
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

const DesktopNavigation = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {/* Home Link */}
      <Link to="/" className="nav-link font-medium text-base">Home</Link>
      
      {/* About Link */}
      <Link to="/about" className="nav-link font-medium text-base">About</Link>
      
      {/* Travel Link */}
      <Link to="/travel" className="nav-link font-medium text-base">Travel</Link>
      
      {/* Blog Link - replaces Categories dropdown */}
      <Link to="/blog" className="nav-link font-medium text-base">Blog</Link>
      
      {/* Contact Link */}
      <Link to="/contact" className="nav-link font-medium text-base">Contact</Link>
      
      {/* Shop Link */}
      <Link to="/shop" className="nav-link flex items-center gap-1 font-medium text-base">
        <ShoppingBag className="h-5 w-5" />
        <span>Shop</span>
      </Link>
      
      {/* Cart */}
      <CartButton />
      
      <ProductSearch />
    </nav>
  );
};

export default DesktopNavigation;
