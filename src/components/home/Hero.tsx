import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPosts, transformPost } from '@/lib/wordpress';

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
      }
    };

    fetchPostImages();
  }, []);

  useEffect(() => {
    // Automatically advance the slider every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative bg-gradient-to-r from-charcoal to-gray-800 text-white min-h-[85vh] flex items-center overflow-hidden">
      {/* Fullscreen background image carousel */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70 z-10"></div>
            <img 
              src={image.url} 
              alt={image.alt}
              className="object-cover w-full h-full" 
            />
          </div>
        ))}
        
        {/* Manual navigation controls */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="container-lg relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="title-xl mb-6">Explore. Experience. Evolve.</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Join me on a journey through lifestyle, travel, and personal growth. 
            Discover insights, tips, and stories to inspire your own path.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/explore-travel" className="btn-primary">
              Explore Travel <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/blog" className="bg-transparent border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-charcoal transition-colors inline-flex items-center">
              Read Blog <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
