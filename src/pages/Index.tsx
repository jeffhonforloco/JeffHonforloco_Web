
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedPosts from '../components/home/FeaturedPosts';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import CategoryFeature from '../components/home/CategoryFeature';
import NewsletterCTA from '../components/home/NewsletterCTA';
import AdSection from '../components/home/AdSection';
import SEO from '../components/shared/SEO';
import FeaturedArticle from '../components/home/FeaturedArticle';
import TrendingArticles from '../components/home/TrendingArticles';
import EbookPopup from '../components/home/EbookPopup';
import NewsletterPopup from '../components/home/NewsletterPopup';
import SocialMediaFeed from '../components/home/SocialMediaFeed';
import { initEngagementTracking } from '@/utils/userEngagement';
import { ArrowUp } from 'lucide-react';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Handle scroll events
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Set loaded state after a short delay for animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  useEffect(() => {
    // Initialize engagement tracking with proper error handling
    let cleanupTracking: (() => void) | undefined;
    
    try {
      cleanupTracking = initEngagementTracking();
      console.log('Homepage view tracked');
    } catch (error) {
      console.error('Error initializing engagement tracking:', error);
    }
    
    // Add structured data directly to the page
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Jeff HonForLoco - Lifestyle, Travel and Personal Growth',
      description: 'Explore lifestyle, travel, and personal growth with Jeff HonForLoco. Discover insights, tips, and stories to inspire your journey.',
      url: 'https://www.jeffhonforloco.com/',
      author: {
        '@type': 'Person',
        name: 'Jeff HonForLoco',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Jeff HonForLoco Blog',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.jeffhonforloco.com/logo.png',
        },
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.jeffhonforloco.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      sameAs: [
        'https://www.facebook.com/people/Jeff-Honforloco/61551819509232/',
        'https://www.instagram.com/jeffhonforloco',
        'https://www.youtube.com/@jeffhonforloco',
        'https://x.com/jeffhonforloco',
        'https://www.tiktok.com/@jeffhonforloco',
        'https://www.linkedin.com/in/jeffhonforloco/',
        'https://www.pinterest.com/jeffhonforloco/',
        'https://bsky.app/profile/jeffhonforloco.bsky.social',
        'https://www.reddit.com/user/jeffhonforloco/',
        'https://www.threads.net/@jeffhonforloco',
        'https://www.tumblr.com/jeffhonforloco'
      ]
    };

    try {
      // Remove any existing script tags with the same ID
      const existingScript = document.getElementById('homepage-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
  
      // Add the new script tag
      const script = document.createElement('script');
      script.id = 'homepage-structured-data';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
  
      // For testing, clear previously set local storage values for popups
      if (process.env.NODE_ENV === 'development') {
        localStorage.removeItem('newsletter-subscribed');
        localStorage.removeItem('ebook-downloaded');
        localStorage.removeItem('ebook-popup-shown');
        localStorage.removeItem('content-sections-loaded');
        console.log('Reset popup state and content section tracking for testing');
      }
  
      // Mark content sections as loaded for dynamic content
      localStorage.setItem('content-sections-loaded', 'true');
    } catch (error) {
      console.error('Error setting up structured data:', error);
    }

    // Clean up
    return () => {
      try {
        const script = document.getElementById('homepage-structured-data');
        if (script) {
          script.remove();
        }
        
        if (cleanupTracking) {
          cleanupTracking();
        }
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Layout>
      <SEO 
        title="Home" 
        description="Explore lifestyle, travel, and personal growth with Jeff HonForLoco. Discover insights, tips, and stories to inspire your journey."
        keywords="lifestyle blog, travel adventures, personal growth, jeff honforloco, blogging tips, digital nomad, travel stories, social media"
        image="/homepage-og.jpg"
        type="website"
      />
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gold text-white shadow-lg hover:bg-gold/90 transition-all duration-300"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      
      <div>
        <Hero />
      </div>
      
      <div>
        <FeaturedArticle />
      </div>
      
      <div>
        <FeaturedPosts />
      </div>
      
      <div>
        <TrendingArticles />
      </div>
      
      {/* Add the Social Media Feed section here */}
      <div>
        <SocialMediaFeed />
      </div>
      
      <div>
        <CategoryFeature />
      </div>
      
      <div>
        <FeaturedDestinations />
      </div>
      
      <div>
        <AdSection />
      </div>
      
      <div>
        <NewsletterCTA />
      </div>
      
      <EbookPopup />
      <NewsletterPopup />
    </Layout>
  );
};

export default Index;
