
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);
  const [checkingApi, setCheckingApi] = useState<boolean>(false);
  
  const checkApiAvailability = async () => {
    setCheckingApi(true);
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
    } finally {
      setCheckingApi(false);
    }
  };
  
  useEffect(() => {
    // Check API availability on mount
    checkApiAvailability();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {apiAvailable === false && (
        <Alert variant="destructive" className="mx-auto mt-20 max-w-3xl">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>WordPress API Unavailable</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>
              The WordPress API is currently unavailable. This means blog posts, articles, and other content may not display properly.
              Placeholder content will be shown instead.
            </p>
            <div className="mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={checkApiAvailability}
                disabled={checkingApi}
                className="text-xs"
              >
                {checkingApi ? 'Checking...' : 'Check Again'}
              </Button>
            </div>
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
