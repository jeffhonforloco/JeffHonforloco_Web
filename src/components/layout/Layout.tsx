
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check API availability
    const checkApiAvailability = async () => {
      try {
        const response = await fetch('https://www.jeffhonforloco.com/wp-json/wp/v2', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add a timeout to prevent long waiting times
          signal: AbortSignal.timeout(5000) 
        });
        
        setApiAvailable(response.ok);
        
        if (!response.ok) {
          console.error('WordPress API not available:', response.status);
        }
      } catch (error) {
        console.error('Error checking WordPress API availability:', error);
        setApiAvailable(false);
      }
    };
    
    checkApiAvailability();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {apiAvailable === false && (
        <Alert variant="destructive" className="mx-auto mt-20 max-w-3xl">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            WordPress API is currently unavailable. Some content may not display properly.
          </AlertDescription>
        </Alert>
      )}
      <main className="flex-grow pt-36 md:pt-42">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
