
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ShopProvider } from "@/context/ShopContext";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import SinglePost from "./pages/SinglePost";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Travel from "./pages/Travel";
import ExploreTravel from "./pages/ExploreTravel";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import DynamicWordPressPage from "./pages/DynamicWordPressPage";
import EmailSubscribers from "./pages/admin/EmailSubscribers";
import WordPressContent from "./pages/admin/WordPressContent";
import TravelTips from "./pages/TravelTips";

// Create a more optimized QueryClient with better caching settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Only retry failed queries once
      staleTime: 60 * 1000, // Consider data fresh for 1 minute
      gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes (replaced cacheTime)
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnMount: false, // Don't refetch when component mounts if data is fresh
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ShopProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Main pages */}
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/post/:slug" element={<SinglePost />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              
              {/* Specific Category Routes - Add motivation-stories explicitly */}
              {/* <Route path="/category/motivation-stories" element={<CategoryPage />} /> */}
              <Route path="/category/motivation-stories/overcoming-challenges" element={<DynamicWordPressPage />} />
              
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/explore-travel" element={<ExploreTravel />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              
              {/* Travel Specific Routes - Organized for better clarity */}
              <Route path="/travel">
                {/* Travel Tips */}
                <Route path="tips" element={<TravelTips />} />
                <Route path="tips/:category" element={<TravelTips />} />
                <Route path="budget-tips" element={<TravelTips category="budget" />} />
                <Route path="luxury-tips" element={<TravelTips category="luxury" />} />
                <Route path="family-tips" element={<TravelTips category="family" />} />
                <Route path="adventure-tips" element={<TravelTips category="adventure" />} />
                <Route path="solo-tips" element={<TravelTips category="solo" />} />
                
                {/* Travel Categories */}
                <Route path="budget" element={<TravelTips category="budget" />} />
                <Route path="luxury" element={<TravelTips category="luxury" />} />
                <Route path="family" element={<TravelTips category="family" />} />
                <Route path="adventure" element={<DynamicWordPressPage />} />
                <Route path="solo" element={<TravelTips category="solo" />} />
                
                {/* Travel Guides and Destinations */}
                <Route path="guides" element={<DynamicWordPressPage />} />
                <Route path="guides/:slug" element={<DynamicWordPressPage />} />
                <Route path="destinations" element={<DynamicWordPressPage />} />
                <Route path="destinations/:slug" element={<DynamicWordPressPage />} />
                <Route path="backpacking-guides" element={<DynamicWordPressPage />} />
                
                {/* Catch-all for other travel pages */}
                <Route path=":slug" element={<DynamicWordPressPage />} />
              </Route>
              
              {/* Admin pages */}
              <Route path="/admin/email-subscribers" element={<EmailSubscribers />} />
              <Route path="/admin/wordpress-content" element={<WordPressContent />} />
              
              {/* Category Pages */}
              <Route path="/category/:categorySlug/*" element={<DynamicWordPressPage />} />
              
              {/* Stories Pages */}
              <Route path="/stories" element={<DynamicWordPressPage />} />
              <Route path="/stories/:storySlug" element={<DynamicWordPressPage />} />
              <Route path="/motivation-stories" element={<DynamicWordPressPage />} />
              <Route path="/overcoming-challenges" element={<DynamicWordPressPage />} />
              
              {/* Post URL fallback - Important for direct post URLs */}
              <Route path="/post/:postSlug/*" element={<DynamicWordPressPage />} />
              
              {/* Story Pages */}
              <Route path="/stories/:storySlug" element={<DynamicWordPressPage />} />
              <Route path="/stories" element={<DynamicWordPressPage />} />
              <Route path="/solo-travel" element={<DynamicWordPressPage />} />
              <Route path="/personal-growth" element={<DynamicWordPressPage />} />
              <Route path="/blogging" element={<DynamicWordPressPage />} />
              
              {/* Resource Pages */}
              <Route path="/resources" element={<DynamicWordPressPage />} />
              <Route path="/tools-for-bloggers" element={<DynamicWordPressPage />} />
              <Route path="/travel-essentials" element={<DynamicWordPressPage />} />
              <Route path="/lifestyle-products" element={<DynamicWordPressPage />} />
              
              {/* Guide Pages */}
              <Route path="/guides" element={<DynamicWordPressPage />} />
              <Route path="/guides/:guideSlug" element={<DynamicWordPressPage />} />
              
              {/* Recommendation Pages */}
              <Route path="/recommendations" element={<DynamicWordPressPage />} />
              <Route path="/recommendations/:recommendationSlug" element={<DynamicWordPressPage />} />
              
              {/* Resource Pages */}
              <Route path="/resources/:resourceSlug" element={<DynamicWordPressPage />} />
              
              {/* Affiliate Pages */}
              <Route path="/affiliate" element={<DynamicWordPressPage />} />
              <Route path="/affiliate/:affiliateSlug" element={<DynamicWordPressPage />} />
              
              {/* Catch-all for dynamic WordPress pages */}
              <Route path="/:slug" element={<DynamicWordPressPage />} />
              
              {/* 404 route */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ShopProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
