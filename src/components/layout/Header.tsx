
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
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-2'
      }`}
    >
      <div className="container-lg flex items-center justify-between">
        {/* Logo - adjusted to take less space */}
        <Link to="/" className="flex items-center mr-6">
          <img 
            src="/lovable-uploads/e52f107c-b791-4d40-b79e-e31779685349.png" 
            alt="Jeff HonForLoco Logo" 
            className="h-20 transition-all duration-300" 
          />
        </Link>
        
        {/* Desktop Navigation - with more space */}
        <div className="flex-1">
          <DesktopNavigation />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Cart */}
          <CartButton mobile />
          
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
      <MobileNavigation isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;
