
import React, { useState, useEffect } from 'react';
import { Download, Mail, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { subscribeEmail } from '@/utils/emailService';
import { isUserEngaged } from '@/utils/userEngagement';

const EbookPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Show popup after a short timeout - simplified for testing
    const timer = setTimeout(() => {
      // Check if user has already downloaded the ebook
      const hasDownloaded = localStorage.getItem('ebook-downloaded');
      
      // For testing - always show popup unless downloaded
      if (!hasDownloaded) {
        // Mark that we've shown the ebook popup to properly space them
        localStorage.setItem('ebook-popup-shown', Date.now().toString());
        setOpen(true);
        console.log('Ebook popup triggered');
      } else {
        console.log('Ebook already downloaded, popup not shown');
      }
    }, 5000); // Reduced to 5 seconds for testing

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use the email service to store the subscription
      const success = await subscribeEmail(
        email,
        'ebook-popup',
        name,
        ['ebook', 'lead-magnet', 'ai-money-guide']
      );
      
      if (success) {
        // Save status to localStorage
        localStorage.setItem('ebook-downloaded', 'true');
        
        // Show download option
        setHasSubmitted(true);
        
        // Show success toast
        toast({
          title: "Thank you for subscribing!",
          description: "Your free ebook is ready to download.",
        });
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    // In a real app, this would be a link to your actual ebook file
    toast({
      title: "Download started",
      description: "Your ebook is downloading now.",
    });
    
    // Close the popup
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Free eBook: How To Make Money With AI and ChatGPT
          </DialogTitle>
          <DialogDescription className="text-base mt-2 text-center">
            Get instant access to my proven strategies for generating income with AI tools.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-10"></div>
          
          {!hasSubmitted ? (
            <form onSubmit={handleSubmit} className="relative p-4 flex flex-col gap-4">
              <div className="flex items-center justify-center mb-2">
                <img 
                  src="/ebook-cover.png" 
                  alt="eBook Cover: How To Make Money With AI and ChatGPT"
                  className="h-40 object-contain shadow-lg rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
                  }}
                />
              </div>
              
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500"
                required
                disabled={isSubmitting}
              />
              
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500"
                required
                disabled={isSubmitting}
              />
              
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Get My Free eBook'} <Mail className="ml-2 h-4 w-4" />
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-2">
                I respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="relative p-6 flex flex-col items-center">
              <h3 className="font-bold text-lg mb-3">Your eBook is Ready!</h3>
              <p className="text-center mb-6">
                Click the button below to download your free copy of "How To Make Money With AI and ChatGPT"
              </p>
              
              <Button 
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center"
              >
                Download eBook <Download className="ml-2 h-4 w-4" />
              </Button>
              
              <p className="text-sm text-center text-gray-500 mt-6">
                You'll also receive occasional updates and tips on making money with AI. 
                Feel free to unsubscribe anytime.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EbookPopup;
