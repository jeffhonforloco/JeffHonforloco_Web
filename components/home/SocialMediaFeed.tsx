
import React, { useState } from 'react';
import { 
  Facebook, Instagram, Youtube, Linkedin, 
  Twitter, Share2, ExternalLink,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import TiktokIcon from '../icons/TiktokIcon';
import PinterestIcon from '../icons/PinterestIcon';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Define the social media platforms to display
const socialPlatforms = [
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: <Instagram className="h-5 w-5" />, 
    color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
    url: 'https://www.instagram.com/jeffhonforloco'
  },
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    icon: <TiktokIcon className="h-5 w-5" />, 
    color: 'bg-black',
    url: 'https://www.tiktok.com/@jeffhonforloco'
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: <Youtube className="h-5 w-5" />, 
    color: 'bg-red-600',
    url: 'https://www.youtube.com/@jeffhonforloco'
  },
  { 
    id: 'twitter', 
    name: 'X (Twitter)', 
    icon: <Twitter className="h-5 w-5" />, 
    color: 'bg-black',
    url: 'https://x.com/jeffhonforloco'
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: <Facebook className="h-5 w-5" />, 
    color: 'bg-blue-600',
    url: 'https://www.facebook.com/people/Jeff-Honforloco/61551819509232/'
  }
];

// Placeholder content - in a production site, these would be fetched from the respective APIs
const socialContent = {
  instagram: [
    { id: 1, type: 'image', thumbnail: '/lovable-uploads/074a0d88-eee8-4e86-b08f-a5634be337ee.png', caption: 'Amazing travel adventure in Bali #travel #adventure' },
    { id: 2, type: 'video', thumbnail: '/lovable-uploads/de41e868-2d87-4432-b302-30721ae1dc95.png', caption: 'Hiking the mountains #nature #hike' },
    { id: 3, type: 'image', thumbnail: '/lovable-uploads/1b3ef5fa-016d-4cd5-9724-895a53b211a9.png', caption: 'Digital nomad life #workfromanywhere' }
  ],
  tiktok: [
    { id: 1, type: 'video', thumbnail: '/lovable-uploads/de41e868-2d87-4432-b302-30721ae1dc95.png', caption: 'How to pack for a month-long trip #traveltips' },
    { id: 2, type: 'video', thumbnail: '/lovable-uploads/1b3ef5fa-016d-4cd5-9724-895a53b211a9.png', caption: 'Morning routine in Bali #balilife' }
  ],
  youtube: [
    { id: 1, type: 'video', thumbnail: '/lovable-uploads/074a0d88-eee8-4e86-b08f-a5634be337ee.png', caption: 'Complete Guide to Bali | Travel Vlog' },
    { id: 2, type: 'video', thumbnail: '/lovable-uploads/de41e868-2d87-4432-b302-30721ae1dc95.png', caption: 'How I Make Money While Traveling | Digital Nomad Tips' }
  ],
  twitter: [
    { id: 1, type: 'text', content: 'Just arrived in Bali! Can\'t wait to explore this beautiful island. #travel #bali' },
    { id: 2, type: 'text', content: 'Working with an ocean view today. Living the digital nomad dream! #digitalnomad #workanywhere' }
  ],
  facebook: [
    { id: 1, type: 'image', thumbnail: '/lovable-uploads/074a0d88-eee8-4e86-b08f-a5634be337ee.png', caption: 'New blog post: "10 Essential Items Every Traveler Needs" - check it out!' },
    { id: 2, type: 'video', thumbnail: '/lovable-uploads/de41e868-2d87-4432-b302-30721ae1dc95.png', caption: 'Live from Bali - answering all your travel questions!' }
  ]
};

const SocialMediaFeed: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState('instagram');
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Follow My Journey</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay connected and see my latest updates across social media platforms
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {socialPlatforms.map(platform => (
              <a 
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-white ${platform.color} transition-transform hover:scale-105`}
              >
                {platform.icon}
                <span className="hidden sm:inline">{platform.name}</span>
              </a>
            ))}
          </div>
        </div>
        
        <Tabs defaultValue={activePlatform} onValueChange={setActivePlatform} className="w-full">
          <TabsList className="flex justify-center mb-8 bg-transparent">
            {socialPlatforms.map(platform => (
              <TabsTrigger 
                key={platform.id} 
                value={platform.id}
                className="data-[state=active]:bg-gray-200 dark:data-[state=active]:bg-gray-800 rounded-full px-4 py-2 flex items-center gap-2"
              >
                {platform.icon}
                <span className="hidden sm:inline">{platform.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {socialPlatforms.map(platform => (
            <TabsContent key={platform.id} value={platform.id} className="focus-visible:outline-none focus-visible:ring-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {socialContent[platform.id as keyof typeof socialContent]?.map((item) => (
                    <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full">
                        {item.type === 'video' || item.type === 'image' ? (
                          <div className="relative aspect-square overflow-hidden">
                            <img 
                              src={item.thumbnail} 
                              alt={item.caption || 'Social media content'} 
                              className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                            {item.type === 'video' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-gold border-b-[10px] border-b-transparent ml-1"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-6 bg-gray-100 dark:bg-gray-700 h-48 flex items-center justify-center">
                            <p className="text-center text-gray-800 dark:text-gray-200 font-medium">{item.content}</p>
                          </div>
                        )}
                        
                        <div className="p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {item.caption || item.content}
                          </p>
                          
                          <div className="flex justify-between items-center mt-4">
                            <a 
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gold hover:text-gold/80 flex items-center gap-1 text-sm"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>View on {platform.name}</span>
                            </a>
                            
                            <Button variant="ghost" size="icon">
                              <Share2 className="h-4 w-4" />
                              <span className="sr-only">Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-6 gap-4">
                  <CarouselPrevious className="static translate-y-0 mr-2" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-10 text-center">
          <a 
            href="https://www.instagram.com/jeffhonforloco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-full transition-colors"
          >
            <span>See More Content</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaFeed;
