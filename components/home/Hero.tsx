
import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPosts, transformPost } from '@/lib/wordpress';
import { Button } from '@/components/ui/button';

interface HeroImage {
  url: string;
  alt: string;
}

const fallbackImages = [
  {
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Travel landscape"
  },
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Mountain landscape with sun rays"
  },
  {
    url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "River between mountains"
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroImages, setHeroImages] = useState<HeroImage[]>(fallbackImages);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    const fetchPostImages = async () => {
      try {
        setLoading(true);
        const posts = await getPosts({ perPage: 5 });
        
        if (posts && posts.length > 0) {
          // Get images from featured posts
          const images = posts
            .filter(post => post._embedded?.['wp:featuredmedia']?.[0]?.source_url)
            .map(post => {
              const transformedPost = transformPost(post);
              return {
                url: transformedPost.featuredImage,
                alt: transformedPost.title || 'Featured post image'
              };
            });
          
          // If we got at least 3 images, use them, otherwise keep fallbacks
          if (images.length >= 3) {
            setHeroImages(images);
          }
        }
      } catch (error) {
        console.error('Error fetching post images for hero:', error);
        // Keep using fallback images
      } finally {
        setLoading(false);
        setTimeout(() => setAnimateTitle(true), 500);
      }
    };

    fetchPostImages();
  }, []);

  useEffect(() => {
    // Automatically advance the slider every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      setImageLoaded(false);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  // Preload images for smoother transitions
  useEffect(() => {
    heroImages.forEach(image => {
      const img = new Image();
      img.src = image.url;
    });
  }, [heroImages]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const scrollToContent = () => {
    const featuredArticleSection = document.querySelector('section:nth-of-type(2)');
    if (featuredArticleSection) {
      featuredArticleSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-charcoal to-gray-800 text-white min-h-[90vh] flex items-center overflow-hidden">
      {/* Fullscreen background image carousel */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10"></div>
            <img 
              src={image.url} 
              alt={image.alt}
              className={`object-cover w-full h-full transition-transform duration-7000 ${imageLoaded && index === currentIndex ? 'scale-105' : 'scale-100'}`}
              onLoad={index === currentIndex ? handleImageLoad : undefined}
            />
          </div>
        ))}
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-full h-20 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
        
        {/* Manual navigation controls */}
        <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-gold scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="container-lg relative z-10">
        <div className="max-w-2xl">
          <div className={`transform transition-all duration-700 ${animateTitle ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-gold to-amber-400 text-white text-sm font-bold rounded-full mb-6 transform hover:scale-105 transition-transform duration-300 shadow-lg">
              Welcome to Jeff HonForLoco
            </span>
            
            <h1 className="title-xl mb-8 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-300">
                Explore. Experience.{' '}
              </span>
              <span className="text-gold relative inline-block">
                Evolve
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gold/50 rounded-full"></span>
              </span>
              <span className="text-gold">.</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-gray-100 leading-relaxed max-w-xl">
              Join me on a journey through lifestyle, travel, and personal growth. 
              Discover insights, tips, and stories to inspire your own path.
            </p>
            
            <div className="flex flex-wrap gap-5">
              <Link to="/explore-travel">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-white font-medium group overflow-hidden relative shadow-md">
                  <span className="relative z-10 flex items-center">
                    Explore Travel 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Button>
              </Link>
              <Link to="/blog">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 group shadow-md">
                  Read Blog 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Animated scroll indicator with ripple effect */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 hidden md:block">
            <div className="flex flex-col items-center">
              <span className="text-sm text-white/70 mb-2">Scroll Down</span>
              <button 
                onClick={scrollToContent}
                className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center group hover:border-gold hover:bg-gold/20 transition-all duration-300"
                aria-label="Scroll to content"
              >
                <ChevronDown className="h-5 w-5 text-white/70 group-hover:text-gold animate-bounce" />
                <span className="absolute w-full h-full rounded-full bg-gold/20 animate-ping"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-24 h-24 border border-white/10 rounded-full animate-[spin_20s_linear_infinite] opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 border border-gold/20 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-40"></div>
      <div className="absolute top-1/4 left-10 w-12 h-12 border border-white/10 rounded-full animate-[spin_25s_linear_infinite] opacity-20"></div>
    </section>
  );
};

export default Hero;
