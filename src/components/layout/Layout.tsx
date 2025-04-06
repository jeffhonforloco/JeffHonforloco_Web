
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { ScrollToTop } from './ScrollToTop';
import NewsletterPopup from '../home/NewsletterPopup';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 md:pt-28">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <NewsletterPopup />
    </div>
  );
};

export default Layout;
