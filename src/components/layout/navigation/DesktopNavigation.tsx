
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Compass } from 'lucide-react';
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
      <Link to="/" className="nav-link">Home</Link>
      
      {/* Travel Link with Icon */}
      <Link to="/travel" className="nav-link flex items-center gap-1">
        <Compass className="h-5 w-5" />
        <span>Travel</span>
      </Link>
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="nav-link">Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {mainCategories.map((category) => (
                  <NavigationItem
                    key={category.id}
                    title={category.name}
                    href={`/category/${category.slug}`}
                    description={category.description}
                  />
                ))}
                <NavigationItem
                  title="View All Posts"
                  href="/blog"
                  description="Browse all blog posts across categories"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
      
      {/* Shop Link */}
      <Link to="/shop" className="nav-link flex items-center gap-1">
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
