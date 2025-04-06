import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ShoppingBag, ShoppingCart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useShopContext } from '@/context/ShopContext';
import ProductSearch from '@/components/shop/ProductSearch';

const mainCategories = [
  { id: 1, name: "Lifestyle & Growth", slug: "lifestyle-growth", description: "Productivity hacks, healthy habits, mindfulness" },
  { id: 2, name: "Travel Adventures", slug: "travel-adventures", description: "Travel hacks, adventure spots, budget-friendly trips" },
  { id: 3, name: "Product Reviews", slug: "product-reviews", description: "Tech for travelers, home fitness, growth tools" },
  { id: 4, name: "How-To Guides", slug: "how-to-guides", description: "Blogging tips, productivity tricks, remote work guide" },
  { id: 5, name: "Motivation & Stories", slug: "motivation-stories", description: "Personal growth, travel lessons, blogging journey" }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useShopContext();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-2'
      }`}
    >
      <div className="container-lg flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/e52f107c-b791-4d40-b79e-e31779685349.png" 
            alt="Jeff HonForLoco Logo" 
            className="h-24 transition-all duration-300" 
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link">Home</Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="nav-link">Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {mainCategories.map((category) => (
                      <ListItem
                        key={category.id}
                        title={category.name}
                        href={`/category/${category.slug}`}
                        description={category.description}
                      />
                    ))}
                    <ListItem
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-charcoal hover:text-gold transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-4">
              <div className="flex flex-col gap-4">
                {cartCount > 0 ? (
                  <>
                    <p className="text-sm text-muted-foreground">Your cart has {cartCount} items</p>
                    <DropdownMenuItem asChild>
                      <Link to="/cart" className="w-full justify-center">
                        <Button className="w-full">View Cart</Button>
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center">Your cart is empty</p>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ProductSearch />
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Cart */}
          <Link to="/cart" className="relative mr-2">
            <ShoppingCart className="h-5 w-5 text-charcoal" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* Mobile Search */}
          <ProductSearch>
            <Button variant="ghost" size="icon" className="mr-1">
              <span className="sr-only">Search products</span>
              <Search className="h-5 w-5" />
            </Button>
          </ProductSearch>
          
          <button 
            className="text-charcoal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white animate-slide-down">
          <nav className="container-lg py-6 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-lg font-medium text-charcoal" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="py-2">
              <p className="text-lg font-medium text-charcoal mb-2">Categories</p>
              <div className="pl-4 flex flex-col space-y-2">
                {mainCategories.map((category) => (
                  <Link 
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="text-charcoal hover:text-gold transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link 
                  to="/blog"
                  className="text-charcoal font-medium hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View All Posts
                </Link>
              </div>
            </div>
            
            <Link 
              to="/about" 
              className="text-lg font-medium text-charcoal"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <Link 
              to="/contact" 
              className="text-lg font-medium text-charcoal"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Shop Link for Mobile */}
            <Link 
              to="/shop" 
              className="text-lg font-medium text-charcoal flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Shop</span>
            </Link>
            
            <div className="pt-2">
              <ProductSearch>
                <button 
                  className="flex items-center text-charcoal"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Search className="h-5 w-5 mr-2" />
                  <span>Search</span>
                </button>
              </ProductSearch>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    description?: string;
  }
>(({ className, title, description, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
