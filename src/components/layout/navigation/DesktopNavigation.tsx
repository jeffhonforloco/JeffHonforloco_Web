
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
      {/* About Link */}
      <Link to="/about" className="nav-link font-medium text-base">About</Link>
      
      {/* LifeStyle Link */}
      <Link to="/category/lifestyle-growth" className="nav-link font-medium text-base">LifeStyle</Link>
      
      {/* Travel Link */}
      <Link to="/travel" className="nav-link font-medium text-base">Travel</Link>
      
      {/* Reviews Link */}
      <Link to="/category/product-reviews" className="nav-link font-medium text-base">Reviews</Link>
      
      {/* Guides Link */}
      <Link to="/category/how-to-guides" className="nav-link font-medium text-base">Guides</Link>
      
      {/* More Link - This could be a dropdown for additional content */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent px-0 font-medium text-base">More</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 p-4">
                <NavigationItem 
                  title="Home" 
                  href="/"
                />
                <NavigationItem 
                  title="Blog" 
                  href="/blog"
                />
                <NavigationItem 
                  title="Contact" 
                  href="/contact"
                />
                <NavigationItem 
                  title="Motivation & Stories" 
                  href="/category/motivation-stories"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
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
