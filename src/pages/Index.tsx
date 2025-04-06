
import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedPosts from '../components/home/FeaturedPosts';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import CategoryFeature from '../components/home/CategoryFeature';
import NewsletterCTA from '../components/home/NewsletterCTA';
import AdSection from '../components/home/AdSection';
import SEO from '../components/shared/SEO';

const Index = () => {
  return (
    <Layout>
      <SEO 
        title="Home" 
        description="Explore lifestyle, travel, and personal growth with Jeff HonForLoco. Discover insights, tips, and stories to inspire your journey." 
      />
      <Hero />
      <FeaturedPosts />
      <FeaturedDestinations />
      <AdSection />
      <CategoryFeature />
      <NewsletterCTA />
    </Layout>
  );
};

export default Index;
