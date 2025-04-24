import React from 'react';
import { 
  Facebook, Twitter, Instagram, Youtube, 
  Linkedin, MessageCircle, Mail, Globe
} from 'lucide-react';
import TiktokIcon from '../icons/TiktokIcon';
import PinterestIcon from '../icons/PinterestIcon';
import { Link } from 'react-router-dom';

// Define our main categories for the footer
const footerCategories = [
  { id: 1, name: "Lifestyle & Growth", slug: "lifestyle-growth" },
  { id: 2, name: "Travel Adventures", slug: "travel-adventures" },
  { id: 3, name: "Product Reviews", slug: "product-reviews" },
  { id: 4, name: "How-To Guides", slug: "how-to-guides" },
  { id: 5, name: "Motivation & Stories", slug: "motivation-stories" }
];

// Social media links
const socialLinks = [
  { name: "Facebook", icon: <Facebook className="h-5 w-5" />, url: "https://www.facebook.com/people/Jeff-HonForloco/61551819509232/" },
  { name: "Instagram", icon: <Instagram className="h-5 w-5" />, url: "https://www.instagram.com/jeffhonforloco" },
  { name: "TikTok", icon: <TiktokIcon className="h-5 w-5" />, url: "https://www.tiktok.com/@jeffhonforloco" },
  { name: "Twitter/X", icon: <Twitter className="h-5 w-5" />, url: "https://x.com/jeffhonforloco" },
  { name: "YouTube", icon: <Youtube className="h-5 w-5" />, url: "https://www.youtube.com/@jeffhonforloco" },
  { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://www.linkedin.com/in/jeffhonforloco/" },
  { name: "Pinterest", icon: <PinterestIcon className="h-5 w-5" />, url: "https://www.pinterest.com/jeffhonforloco/" },
  { name: "BlueSky", icon: <Globe className="h-5 w-5" />, url: "https://bsky.app/profile/jeffhonforloco.bsky.social" },
  { name: "Reddit", icon: <MessageCircle className="h-5 w-5" />, url: "https://www.reddit.com/user/jeffhonforloco/" },
  { name: "Threads", icon: <MessageCircle className="h-5 w-5" />, url: "https://www.threads.net/@jeffhonforloco" },
  { name: "Tumblr", icon: <MessageCircle className="h-5 w-5" />, url: "https://www.tumblr.com/jeffhonforloco" }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-charcoal text-white pt-24 pb-12">
      <div className="container-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand - Enhanced logo display */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="block mb-8">
              <img 
                src="/lovable-uploads/e52f107c-b791-4d40-b79e-e31779685349.png" 
                alt="Jeff HonForLoco Logo" 
                className="h-28 w-auto mx-auto md:mx-0 mb-4 filter brightness-0 invert drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]" 
              />
              <p className="text-gray-300 text-sm text-center md:text-left italic mt-3">
                live bold. travel far. grow every day.
              </p>
            </Link>
            <p className="text-gray-300 mb-8">
              Exploring life through travel, lifestyle, and personal growth experiences.
            </p>
            
            {/* Social Icons */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {socialLinks.slice(0, 10).map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="hover:text-gold transition-colors flex justify-center" 
                  aria-label={social.name} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div className="col-span-1">
            <h3 className="font-serif text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              {footerCategories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.slug}`}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-gold transition-colors">
                  View All Posts
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Pages */}
          <div className="col-span-1">
            <h3 className="font-serif text-lg font-semibold mb-6">Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="font-serif text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-5">Subscribe to get the latest posts and updates.</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                required
              />
              <button 
                type="submit" 
                className="bg-gold text-white px-4 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
              >
                Subscribe <Mail className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-12 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Jeff HonForLoco. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
