
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: "Travel", path: "/category/travel" },
  { name: "Lifestyle", path: "/category/lifestyle" },
  { name: "Personal Growth", path: "/category/personal-growth" },
  { name: "Health", path: "/category/health" },
  { name: "Entertainment", path: "/category/entertainment" }
];

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
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-lg flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl md:text-3xl font-bold text-charcoal">
          Jeff HonForLoco
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link">Home</Link>
          
          <div className="relative group">
            <button className="nav-link flex items-center">
              Categories <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden hidden group-hover:block animate-fade-in z-10">
              {categories.map((category) => (
                <Link 
                  key={category.name}
                  to={category.path}
                  className="block px-4 py-2 text-sm text-charcoal hover:bg-offwhite hover:text-gold transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          <button className="text-charcoal hover:text-gold transition-colors">
            <Search className="h-5 w-5" />
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-charcoal"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
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
                {categories.map((category) => (
                  <Link 
                    key={category.name}
                    to={category.path}
                    className="text-charcoal hover:text-gold transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
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
            
            <div className="pt-2">
              <button className="flex items-center text-charcoal">
                <Search className="h-5 w-5 mr-2" />
                <span>Search</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
