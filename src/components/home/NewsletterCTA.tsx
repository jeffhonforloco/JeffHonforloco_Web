
import React from 'react';
import { Mail } from 'lucide-react';

const NewsletterCTA = () => {
  return (
    <section className="py-20 bg-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" 
          alt="Background pattern"
          className="object-cover w-full h-full" 
        />
      </div>
      
      <div className="container-lg relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="title-lg mb-4">Join the Journey</h2>
          <p className="text-xl mb-8 text-gray-300">
            Subscribe to my newsletter and never miss an update. Get exclusive content, travel tips, and personal insights delivered directly to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-md text-charcoal focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
            <button 
              type="submit" 
              className="bg-gold text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Subscribe <Mail className="ml-2 h-4 w-4" />
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-400">
            I respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
