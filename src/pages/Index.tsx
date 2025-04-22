
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
import SocialMediaIcons from '../components/home/SocialMediaIcons';
import { initEngagementTracking } from '@/utils/userEngagement';
import { ArrowUp } from 'lucide-react';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateSections, setAnimateSections] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      // Check if sections should be animated
      if (window.scrollY > 200 && !animateSections) {
        setAnimateSections(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Stagger the loading of sections
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [animateSections]);
  
  useEffect(() => {
    let cleanupTracking: (() => void) | undefined;
    
    try {
      cleanupTracking = initEngagementTracking();
      console.log('Homepage view tracked');
    } catch (error) {
      console.error('Error initializing engagement tracking:', error);
    }
    
    // Enhanced schema for the homepage
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Jeff HonForLoco - Lifestyle, Travel and Personal Growth',
      description: 'Explore lifestyle, travel, and personal growth with Jeff HonForLoco. Discover insights, tips, and stories to inspire your journey.',
      url: 'https://api.jeffhonforloco.com/',
      author: {
        '@type': 'Person',
        name: 'Jeff HonForLoco',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Jeff HonForLoco Blog',
        logo: {
          '@type': 'ImageObject',
          url: 'https://api.jeffhonforloco.com/logo.png',
        },
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://api.jeffhonforloco.com/search?q={search_term_string}',
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
      ],
      mainContentOfPage: {
        '@type': 'WebPageElement',
        isPartOf: {
          '@type': 'Website',
          name: 'Jeff HonForLoco',
          url: 'https://api.jeffhonforloco.com'
        }
      }
    };

    try {
      const existingScript = document.getElementById('homepage-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
  
      const script = document.createElement('script');
      script.id = 'homepage-structured-data';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
  
      if (process.env.NODE_ENV === 'development') {
        localStorage.removeItem('newsletter-subscribed');
        localStorage.removeItem('ebook-downloaded');
        localStorage.removeItem('ebook-popup-shown');
        localStorage.removeItem('content-sections-loaded');
        console.log('Reset popup state and content section tracking for testing');
      }
  
      localStorage.setItem('content-sections-loaded', 'true');
    } catch (error) {
      console.error('Error setting up structured data:', error);
    }

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

  // Animation classes based on scroll and load state
  const getAnimationClass = (index: number) => {
    const baseDelay = 200; // base delay in ms
    const delay = index * baseDelay; // staggered delay
    
    if (!isLoaded) return 'opacity-0 translate-y-8';
    
    return `animate-fade-in animate-delay-${delay} opacity-100 translate-y-0`;
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
      
      {/* Back to top button */}
      {showScrollTop && (
        <button
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gold text-white shadow-lg hover:bg-gold/90 transition-all duration-300"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      
      {/* Hero section */}
      <div className="transition-all duration-500">
        <Hero />
      </div>
      
      {/* Featured article section */}
      <div className={`transition-all duration-500 ${getAnimationClass(1)}`}>
        <FeaturedArticle />
      </div>
      
      {/* Featured posts section */}
      <div className={`transition-all duration-500 ${getAnimationClass(2)}`}>
        <FeaturedPosts />
      </div>
      
      {/* Trending articles section */}
      <div className={`transition-all duration-500 ${getAnimationClass(3)}`}>
        <TrendingArticles />
      </div>
      
      {/* Social media icons section */}
      <div className={`transition-all duration-500 ${getAnimationClass(4)}`}>
        <SocialMediaIcons />
      </div>
      
      {/* Social media feed section */}
      <div className={`transition-all duration-500 ${getAnimationClass(5)}`}>
        <SocialMediaFeed />
      </div>
      
      {/* Category feature section */}
      <div className={`transition-all duration-500 ${getAnimationClass(6)}`}>
        <CategoryFeature />
      </div>
      
      {/* Featured destinations section */}
      <div className={`transition-all duration-500 ${getAnimationClass(7)}`}>
        <FeaturedDestinations />
      </div>
      
      {/* Ad section */}
      <div className={`transition-all duration-500 ${getAnimationClass(8)}`}>
        <AdSection />
      </div>
      
      {/* Newsletter CTA section */}
      <div className={`transition-all duration-500 ${getAnimationClass(9)}`}>
        <NewsletterCTA />
      </div>
      
      {/* Popups */}
      <EbookPopup />
      <NewsletterPopup />
    </Layout>
  );
};

export default Index;
