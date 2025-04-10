
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
import TravelTips from "./pages/TravelTips";

const queryClient = new QueryClient();

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
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/explore-travel" element={<ExploreTravel />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              
              {/* Travel Specific Routes */}
              <Route path="/travel/tips" element={<TravelTips />} />
              <Route path="/travel/budget-tips" element={<TravelTips category="budget" />} />
              <Route path="/travel/tips/:category" element={<TravelTips />} />
              <Route path="/travel/guides" element={<DynamicWordPressPage />} />
              <Route path="/travel/guides/:slug" element={<DynamicWordPressPage />} />
              <Route path="/travel/destinations" element={<DynamicWordPressPage />} />
              <Route path="/travel/destinations/:slug" element={<DynamicWordPressPage />} />
              <Route path="/travel/backpacking-guides" element={<DynamicWordPressPage />} />
              <Route path="/travel/adventure" element={<DynamicWordPressPage />} />
              <Route path="/travel/budget" element={<TravelTips category="budget" />} />
              <Route path="/travel/:slug" element={<DynamicWordPressPage />} />
              
              {/* Admin pages */}
              <Route path="/admin/email-subscribers" element={<EmailSubscribers />} />
              
              {/* Category Pages */}
              <Route path="/category/:categorySlug/*" element={<DynamicWordPressPage />} />
              
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
