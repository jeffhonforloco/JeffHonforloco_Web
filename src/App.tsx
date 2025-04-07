
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Define routes that should be handled by specific components
const HANDLED_ROUTES = [
  "/", "/blog", "/about", "/contact", "/shop", "/cart", 
  "/travel", "/explore-travel", "/privacy-policy", "/terms-of-service"
];

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
              
              {/* Category Pages */}
              <Route path="/category/:categorySlug/*" element={<DynamicWordPressPage />} />
              
              {/* Story Pages */}
              <Route path="/stories/:storySlug" element={<DynamicWordPressPage />} />
              <Route path="/solo-travel" element={<DynamicWordPressPage />} />
              <Route path="/personal-growth" element={<DynamicWordPressPage />} />
              <Route path="/blogging" element={<DynamicWordPressPage />} />
              
              {/* Resource Pages */}
              <Route path="/tools-for-bloggers" element={<DynamicWordPressPage />} />
              <Route path="/travel-essentials" element={<DynamicWordPressPage />} />
              <Route path="/lifestyle-products" element={<DynamicWordPressPage />} />
              
              {/* Guide Pages */}
              <Route path="/guides/:guideSlug" element={<DynamicWordPressPage />} />
              
              {/* Recommendation Pages */}
              <Route path="/recommendations/:recommendationSlug" element={<DynamicWordPressPage />} />
              
              {/* Resource Pages */}
              <Route path="/resources/:resourceSlug" element={<DynamicWordPressPage />} />
              
              {/* Affiliate Pages */}
              <Route path="/affiliate/:affiliateSlug" element={<DynamicWordPressPage />} />
              
              {/* Catch-all for dynamic WordPress pages */}
              <Route path="/:slug" element={<DynamicWordPressPage />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ShopProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
