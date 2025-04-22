
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { ChevronRight } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  categories: string[];
}

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Swiss Alps',
    description: 'Experience breathtaking mountain vistas',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    slug: 'swiss-alps',
    categories: ['mountain-getaways']
  },
  {
    id: '2',
    name: 'Bali Beaches',
    description: 'Relax on stunning tropical shores',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    slug: 'bali-beaches',
    categories: ['beach-destinations']
  },
  {
    id: '3',
    name: 'Norwegian Fjords',
    description: 'Discover stunning natural landscapes',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    slug: 'norwegian-fjords',
    categories: ['mountain-getaways', 'adventure-travel']
  },
  {
    id: '4',
    name: 'Santorini, Greece',
    description: 'Enjoy breathtaking island views',
    image: 'https://images.unsplash.com/photo-1503152394-c571994fd383',
    slug: 'santorini-greece',
    categories: ['beach-destinations', 'city-exploration']
  },
  {
    id: '5',
    name: 'Kyoto, Japan',
    description: 'Immerse in traditional culture',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    slug: 'kyoto-japan',
    categories: ['city-exploration']
  }
];

export const getDestinationsByCategory = (category?: string) => {
  if (!category) return destinations;
  return destinations.filter(dest => 
    dest.categories.includes(category)
  );
};

export const getDestinationBySlug = (slug?: string) => {
  if (!slug) return null;
  return destinations.find(dest => dest.slug === slug);
};

const FeaturedDestinations: React.FC = () => {
  const [api, setApi] = useState<any>();
  const [searchParams] = useSearchParams();
  const destinationParam = searchParams.get('destination');
  const categoryParam = searchParams.get('category');
  
  const filteredDestinations = categoryParam 
    ? getDestinationsByCategory(categoryParam)
    : destinations;

  return (
    <section className="py-16 bg-white dark:bg-charcoal dark:text-white">
      <div className="container-lg">
        <div className="flex justify-between items-center mb-12">
          <h2 className="title-md">
            {categoryParam 
              ? `${categoryParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`
              : 'Featured Destinations'}
          </h2>
          <Link 
            to="/explore-travel" 
            className="flex items-center text-charcoal dark:text-white hover:text-gold transition-colors"
          >
            Explore all destinations <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <Carousel 
          opts={{ 
            align: "start",
            loop: true
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="-ml-4">
            {filteredDestinations.map(destination => (
              <CarouselItem key={destination.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="rounded-lg overflow-hidden shadow-md hover-scale group dark:bg-gray-800 dark:border-gray-700">
                  <Link to={`/explore-travel?destination=${destination.slug}`} className="block">
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-white font-bold text-xl mb-2">{destination.name}</h3>
                        <p className="text-white/90 text-sm">{destination.description}</p>
                      </div>
                    </div>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="relative static left-0 right-0 translate-y-0 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-charcoal dark:text-white" />
            <CarouselNext className="relative static left-0 right-0 translate-y-0 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-charcoal dark:text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
