
import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";
import { subscribeEmail } from '@/utils/emailService';

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Show popup after 15 seconds (increased from 5 seconds to not conflict with ebook popup)
    const timer = setTimeout(() => {
      // Check if user has already subscribed (using localStorage)
      const hasSubscribed = localStorage.getItem('newsletter-subscribed');
      // Also check if they downloaded the ebook (to avoid too many popups)
      const hasDownloadedEbook = localStorage.getItem('ebook-downloaded');
      
      if (!hasSubscribed && !hasDownloadedEbook) {
        setOpen(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use the email service to store the subscription
      const success = await subscribeEmail(
        email,
        'newsletter-popup',
        undefined,
        ['newsletter', 'popup']
      );
      
      if (success) {
        // Save subscription status to localStorage
        localStorage.setItem('newsletter-subscribed', 'true');
        
        // Close the popup
        setOpen(false);
        
        // Show success toast
        toast({
          title: "Subscription successful!",
          description: "Thank you for subscribing to our newsletter.",
        });
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Join the Journey</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Subscribe to get the latest posts and updates directly to your inbox.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative mt-4 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-10"></div>
          <form onSubmit={handleSubmit} className="relative p-4 flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-4 py-3 rounded-md text-charcoal focus:outline-none focus:ring-2 focus:ring-gold"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="w-full bg-gold text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'} <Mail className="ml-2 h-4 w-4" />
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
              I respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
