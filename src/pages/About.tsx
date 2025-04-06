
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import SEO from '../components/shared/SEO';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Mail, MapPin, Globe, FileText, Briefcase, Calendar, Award } from 'lucide-react';
import { getPageBySlug } from '../lib/wordpress';
import AdSection from '../components/home/AdSection';

interface AboutContent {
  title: string;
  content: string;
  featuredImage?: string;
}

const About = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        setLoading(true);
        const pageData = await getPageBySlug('about');
        
        if (pageData) {
          setAboutContent({
            title: pageData.title.rendered,
            content: pageData.content.rendered,
            featuredImage: pageData._embedded?.['wp:featuredmedia']?.[0]?.source_url
          });
        }
      } catch (error) {
        console.error('Error fetching about page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  return (
    <Layout>
      <SEO 
        title="About Me" 
        description="Learn more about Jeff HonForLoco, my journey, interests, and the story behind this blog." 
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-charcoal to-gray-800 text-white">
        <div className="container-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 animate-fade-in">
              <h1 className="title-xl mb-6">About Me</h1>
              <p className="text-lg text-gray-100 mb-8">
                Passionate traveler, lifestyle enthusiast, and personal growth advocate sharing stories and insights from around the world.
              </p>
              
              <div className="flex items-center space-x-4">
                <a href="mailto:contact@jeffhonforloco.com" className="btn-primary">
                  <Mail className="mr-2 h-4 w-4" /> Contact Me
                </a>
                <a href="/blog" className="btn-secondary">
                  <FileText className="mr-2 h-4 w-4" /> Read My Blog
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 max-w-md">
              {loading ? (
                <Skeleton className="w-full aspect-square rounded-full" />
              ) : (
                <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto overflow-hidden rounded-full border-4 border-gold shadow-xl">
                  <img 
                    src={aboutContent?.featuredImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"} 
                    alt="Jeff HonForLoco" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Bio Section */}
      <section className="py-16 bg-white">
        <div className="container-lg">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-full" />
              </div>
            ) : aboutContent ? (
              <div className="prose lg:prose-lg max-w-none" 
                dangerouslySetInnerHTML={{ __html: aboutContent.content }} 
              />
            ) : (
              <div className="text-center">
                <h2 className="title-md mb-4">My Story</h2>
                <div className="space-y-6 text-left">
                  <p>
                    Hello! I'm Jeff HonForLoco, a passionate writer, traveler, and lifestyle enthusiast. For the past decade, I've been exploring the world, documenting my experiences, and sharing insights on personal growth, travel, and modern living.
                  </p>
                  <p>
                    My journey began when I took a leap of faith and left my corporate job to pursue a more fulfilling life aligned with my passions. What started as a personal blog to keep friends and family updated on my adventures has evolved into a platform where I share stories, tips, and reflections with readers worldwide.
                  </p>
                  <p>
                    Whether I'm wandering through ancient streets in Italy, discovering hidden culinary gems in Japan, or exploring mindfulness practices in Bali, I strive to approach each experience with curiosity, authenticity, and an open heart.
                  </p>
                  <p>
                    Beyond travel, I'm deeply interested in sustainable living, personal development, and the intersection of technology and well-being in our modern world. I believe in living intentionally and finding beauty in everyday moments.
                  </p>
                  <p>
                    Through this blog, I hope to inspire you to explore not just new destinations, but new ways of thinking, living, and being. Thank you for joining me on this journey!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Quick Info */}
      <section className="py-16 bg-offwhite">
        <div className="container-lg">
          <h2 className="title-md text-center mb-12">Quick Facts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover-scale">
              <div className="flex items-start">
                <div className="bg-gold/10 p-3 rounded-full mr-4">
                  <User className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Background</h3>
                  <p className="text-gray-600">Former marketing executive turned full-time content creator and digital nomad.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover-scale">
              <div className="flex items-start">
                <div className="bg-gold/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Based In</h3>
                  <p className="text-gray-600">Currently based in San Francisco, but frequently traveling around the world.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover-scale">
              <div className="flex items-start">
                <div className="bg-gold/10 p-3 rounded-full mr-4">
                  <Briefcase className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Expertise</h3>
                  <p className="text-gray-600">Travel planning, sustainable living, photography, and storytelling.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover-scale">
              <div className="flex items-start">
                <div className="bg-gold/10 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Blogging Since</h3>
                  <p className="text-gray-600">Started this journey in 2017 and never looked back.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* My Values */}
      <section className="py-16 bg-white">
        <div className="container-lg">
          <h2 className="title-md text-center mb-4">My Values</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            These core principles guide my work, travels, and life philosophy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-bold text-xl mb-2">Authenticity</h3>
              <p className="text-gray-600">
                I believe in genuine experiences and honest storytelling. Every piece of content I create comes from a place of truth and personal experience.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-bold text-xl mb-2">Quality</h3>
              <p className="text-gray-600">
                I'm committed to providing high-quality, well-researched content that adds real value to your life, whether it's travel tips or personal development insights.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-bold text-xl mb-2">Growth</h3>
              <p className="text-gray-600">
                I believe in continuous learning and personal evolution. My content aims to inspire growth and new perspectives in myself and my readers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 bg-gold text-white text-center">
        <div className="container-lg">
          <h2 className="title-lg mb-6">Let's Connect</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Have a question, collaboration idea, or just want to say hello? I'd love to hear from you!
          </p>
          <a 
            href="mailto:contact@jeffhonforloco.com" 
            className="inline-flex items-center px-6 py-3 bg-white text-gold rounded-md font-medium hover:bg-opacity-90 transition-colors"
          >
            <Mail className="mr-2 h-5 w-5" /> Send Me an Email
          </a>
        </div>
      </section>
      
      <AdSection />
    </Layout>
  );
};

export default About;
