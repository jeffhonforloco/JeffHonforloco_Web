
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const heroImages = [
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
  return (
    <section className="relative bg-gradient-to-r from-charcoal to-gray-800 text-white min-h-[85vh] flex items-center overflow-hidden">
      <Carousel 
        className="absolute inset-0 w-full h-full" 
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70 z-10"></div>
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="object-cover w-full h-full transition-all duration-500 ease-in-out" 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 z-20 bg-black/30 hover:bg-black/50 text-white" />
        <CarouselNext className="absolute right-4 z-20 bg-black/30 hover:bg-black/50 text-white" />
      </Carousel>
      
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
            <Link to="/about" className="bg-transparent border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-charcoal transition-colors inline-flex items-center">
              About Me <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
