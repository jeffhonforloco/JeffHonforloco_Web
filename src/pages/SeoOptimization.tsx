
import React from 'react';
import Layout from '../components/layout/Layout';
import SEO from '../components/shared/SEO';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Check } from 'lucide-react';

const SeoOptimizationPage = () => {
  return (
    <Layout>
      <SEO 
        title="SEO Optimization Guide" 
        description="Learn how your Jeff HonForLoco blog is optimized for search engines and what actions you can take to improve visibility."
        keywords="seo, search engine optimization, blog seo, wordpress seo, blogging tips"
        noIndex={true}
      />
      
      <div className="container max-w-4xl py-12 article-content">
        <h1>SEO Optimization Guide</h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-700">
            This page outlines the SEO optimizations implemented on your blog and provides guidance for maintaining strong search visibility.
          </p>
        </div>
        
        <h2>Implemented SEO Optimizations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-4">Technical SEO</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Enhanced robots.txt with crawler directives</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>XML sitemap for better content discovery</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Schema.org structured data for rich snippets</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Canonical URLs to prevent duplicate content</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Semantic HTML5 markup for better crawling</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-4">On-Page SEO</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Optimized title tags and meta descriptions</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Header hierarchy (H1-H6) for content structure</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Image optimization with alt text</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Internal linking between related content</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Keyword optimization & content readability</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-4">Content SEO</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Automated reading time calculations</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Keyword extraction from content</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Related content suggestions</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Category and tag optimization</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Enhanced typography for readability</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-4">Social & Sharing</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Open Graph tags for Facebook sharing</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Twitter card metadata</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Easy social sharing buttons</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Schema.org author and publisher markup</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>Article publishing dates for freshness</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <h2>SEO Best Practices for Your Content</h2>
        
        <p>
          While the technical SEO foundation has been implemented, the quality of your content remains the most important factor for search engine rankings. Here are some best practices to follow:
        </p>
        
        <h3>Keyword Research</h3>
        <p>
          Before writing, research keywords that your audience is searching for. Tools like Google Keyword Planner, Ahrefs, or SEMrush can help identify relevant keywords with good search volume and manageable competition.
        </p>
        
        <h3>Content Structure</h3>
        <ul>
          <li>Use a clear, compelling H1 title that includes your primary keyword</li>
          <li>Organize content with H2 and H3 subheadings for easy scanning</li>
          <li>Include your target keyword in the first 100 words</li>
          <li>Write comprehensive content (1500+ words for competitive topics)</li>
          <li>Use bullet points and numbered lists for better readability</li>
        </ul>
        
        <h3>Media Optimization</h3>
        <ul>
          <li>Include relevant images, videos, or infographics</li>
          <li>Always add descriptive alt text to images (including your keyword when relevant)</li>
          <li>Compress images for faster loading</li>
          <li>Use descriptive filenames for media files</li>
        </ul>
        
        <h3>Internal Linking</h3>
        <p>
          Link to other relevant articles on your blog to help search engines understand your site structure and keep readers engaged with your content.
        </p>
        
        <h3>Meta Description</h3>
        <p>
          Write compelling meta descriptions (150-160 characters) that include your primary keyword and entice users to click through from search results.
        </p>
        
        <Separator className="my-8" />
        
        <h2>Competitive Analysis</h2>
        
        <p>
          We've analyzed top competitors in your niche and implemented similar SEO strategies to help your content compete effectively. Key observations include:
        </p>
        
        <div className="overflow-x-auto my-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">Competitor</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Strength</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Our Implementation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">adamenfroy.com</td>
                <td className="border border-gray-200 px-4 py-2">Comprehensive content with clear structure</td>
                <td className="border border-gray-200 px-4 py-2">Enhanced typography and content structure</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">smartblogger.com</td>
                <td className="border border-gray-200 px-4 py-2">Extensive internal linking</td>
                <td className="border border-gray-200 px-4 py-2">Related posts and category navigation</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">backlinko.com</td>
                <td className="border border-gray-200 px-4 py-2">Rich schema markup</td>
                <td className="border border-gray-200 px-4 py-2">Comprehensive structured data</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">ryrob.com</td>
                <td className="border border-gray-200 px-4 py-2">Featured snippet optimization</td>
                <td className="border border-gray-200 px-4 py-2">Content formatting for snippet eligibility</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h2>Next Steps for Ongoing SEO Improvement</h2>
        
        <ul>
          <li>Regularly publish fresh, high-quality content (at least 2-4 posts per month)</li>
          <li>Monitor performance in Google Search Console and make adjustments based on data</li>
          <li>Build backlinks from reputable sites in your niche</li>
          <li>Update older content to keep it fresh and relevant</li>
          <li>Expand your content to cover a wider range of relevant topics</li>
        </ul>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-8">
          <p className="text-amber-800">
            Remember that SEO is a long-term strategy. It typically takes 3-6 months to see significant results from your optimization efforts. Be patient and consistent with your content strategy.
          </p>
        </div>
        
        <h2>Useful SEO Resources</h2>
        
        <ul>
          <li>
            <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Google Search Console <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </li>
          <li>
            <a href="https://developers.google.com/search/docs/beginner/seo-starter-guide" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Google's SEO Starter Guide <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </li>
          <li>
            <a href="https://schema.org/docs/schemas.html" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Schema.org Documentation <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </li>
          <li>
            <a href="https://ahrefs.com/blog" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Ahrefs Blog (SEO tutorials) <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </li>
          <li>
            <a href="https://moz.com/learn/seo" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Moz SEO Learning Center <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default SeoOptimizationPage;
