
import React, { useEffect } from 'react';
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
import { initEngagementTracking } from '@/utils/userEngagement';

const Index = () => {
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

  return (
    <Layout>
      <SEO 
        title="Home" 
        description="Explore lifestyle, travel, and personal growth with Jeff HonForLoco. Discover insights, tips, and stories to inspire your journey."
        keywords="lifestyle blog, travel adventures, personal growth, jeff honforloco, blogging tips, digital nomad, travel stories"
        image="/homepage-og.jpg"
        type="website"
      />
      <Hero />
      <FeaturedArticle />
      <FeaturedPosts />
      <TrendingArticles />
      <CategoryFeature />
      <FeaturedDestinations />
      <AdSection />
      <NewsletterCTA />
      <EbookPopup />
      <NewsletterPopup />
    </Layout>
  );
};

export default Index;
