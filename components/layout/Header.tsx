
import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileNavigation from './navigation/MobileNavigation';
import CartButton from './navigation/CartButton';
import ProductSearch from '@/components/shop/ProductSearch';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
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
  
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-3 dark:text-gray-50' : 'bg-white dark:bg-gray-900 py-4 dark:text-gray-50'
      }`}
    >
      <div className="container-lg flex items-center justify-between ">
        {/* Logo with optimized positioning and spacing */}
        <Link to="/" className="flex items-center mr-36">
          <div className="h-24 w-auto flex-shrink-0 relative transition-all duration-300">
            {/* Light mode logo with enhanced shadow */}
            <img 
              src="/lovable-uploads/e52f107c-b791-4d40-b79e-e31779685349.png" 
              alt="Jeff HonForLoco Logo" 
              className="h-full w-auto object-contain filter drop-shadow-lg dark:hidden"
            />
            {/* Dark mode logo with stronger glow effect */}
            <img 
              src="/lovable-uploads/e52f107c-b791-4d40-b79e-e31779685349.png" 
              alt="Jeff HonForLoco Logo" 
              className="h-full w-auto object-contain hidden dark:block brightness-0 invert filter drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]"
            />
          </div>
        </Link>
        
        {/* Desktop Navigation with additional spacing from logo */}
        <div className="flex-1 ml-16">
          <DesktopNavigation />
        </div>
        
        {/* Mobile Menu Button - with increased spacing */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Cart */}
          <CartButton mobile />
          
          {/* Mobile Search */}
          <ProductSearch>
            <Button variant="ghost" size="icon" className="mr-2 font-semibold">
              <span className="sr-only">Search products</span>
              <Search className="h-5 w-5 text-charcoal dark:text-white" />
            </Button>
          </ProductSearch>
          
          <button 
            className="text-charcoal dark:text-white font-semibold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-charcoal dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-charcoal dark:text-white" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileNavigation isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;
