
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SEO from '../components/shared/SEO';
import PostCard from '../components/blog/PostCard';
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import AdSection from '../components/home/AdSection';

// Mock data (will be replaced with WordPress API)
const post = {
  id: 1,
  slug: 'italian-coastal-adventure',
  title: 'Discovering Hidden Gems Along the Italian Coast',
  content: `
    <p>Italy's coastline stretches for thousands of kilometers, offering a diverse range of experiences from the rugged cliffs of Cinque Terre to the pristine beaches of Puglia. While many travelers flock to well-known coastal destinations like the Amalfi Coast and Sardinia, there are countless hidden gems waiting to be discovered by those willing to venture off the beaten path.</p>
    
    <h2>The Forgotten Beaches of Calabria</h2>
    
    <p>Calabria, the toe of Italy's boot, boasts some of the country's most beautiful and least crowded beaches. Tropea, with its dramatic cliffs and crystal-clear waters, is slowly gaining recognition among international travelers, but many of the region's other coastal towns remain relatively undiscovered.</p>
    
    <p>Capo Vaticano, just a short drive from Tropea, offers spectacular views and secluded coves accessible only by foot or boat. The water here is so clear that you can see fish swimming around your feet from the shore.</p>
    
    <p>Further south, the Riviera dei Cedri features a string of charming seaside towns named after the citron fruit that grows abundantly in the area. Diamante, known for its colorful murals and annual chili pepper festival, and Scalea, with its medieval old town perched above a modern beach resort, are both worth exploring.</p>
    
    <h2>Le Marche: Italy's Best-Kept Secret</h2>
    
    <p>While Tuscany draws millions of visitors each year, neighboring Le Marche remains relatively unknown despite offering a similar landscape of rolling hills, medieval towns, and beautiful beaches without the crowds.</p>
    
    <p>The Conero Riviera, just south of Ancona, features dramatic white cliffs plunging into the turquoise Adriatic Sea. The beaches here, such as Due Sorelle (accessible only by boat) and Portonovo, are some of Italy's most beautiful.</p>
    
    <p>Heading south, the resort town of Porto San Giorgio offers kilometers of sandy beaches perfect for families, while the Riviera delle Palme around San Benedetto del Tronto is known for its palm-lined promenade and fine dining options.</p>
    
    <h2>Island Escapes Beyond Capri</h2>
    
    <p>Italy's islands offer some of its most spectacular coastal scenery, but there are many lesser-known islands beyond popular destinations like Capri and Sicily.</p>
    
    <p>The Tremiti Islands, located off the coast of Puglia in the Adriatic Sea, comprise five small islands with crystal-clear waters perfect for snorkeling and diving. San Domino, the largest island, features a pine forest and beautiful beaches, while San Nicola is home to a medieval abbey and fortifications.</p>
    
    <p>For those seeking solitude, the island of Marettimo in the Egadi archipelago off the western coast of Sicily offers pristine nature, excellent hiking, and a small, authentic fishing village largely untouched by mass tourism.</p>
    
    <h2>Tips for Exploring Italy's Hidden Coastal Gems</h2>
    
    <ul>
      <li>Visit during the shoulder seasons (May-June or September-October) when the weather is still pleasant but crowds are smaller.</li>
      <li>Rent a car for maximum flexibility, as public transportation to off-the-beaten-path destinations can be limited.</li>
      <li>Learn a few basic Italian phrases, as English may not be widely spoken in less touristy areas.</li>
      <li>Be prepared for businesses to close during the afternoon riposo (rest period), especially in smaller towns.</li>
      <li>Respect local customs and traditions, which may be more strongly observed in less touristy areas.</li>
    </ul>
    
    <p>Italy's hidden coastal gems offer authentic experiences, breathtaking natural beauty, and a glimpse into traditional Italian coastal life that can be hard to find in more popular destinations. By venturing beyond the well-trodden tourist path, you'll discover a side of Italy that many visitors never see.</p>
  `,
  excerpt: 'Explore the scenic coastal towns and secret beaches that most tourists never find in this journey through Italy\'s stunning coastline.',
  category: 'Travel',
  categorySlug: 'travel',
  featuredImage: 'https://images.unsplash.com/photo-1533606688190-a73cb4b14e22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  date: 'May 15, 2023',
  readingTime: '8 min read',
  author: 'Jeff HonForLoco',
  authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
};

// Mock related posts
const relatedPosts = [
  {
    id: 3,
    slug: 'sustainable-fashion-choices',
    title: 'Making Sustainable Fashion Choices Without Compromising Style',
    excerpt: 'Discover how to build an eco-friendly wardrobe that reflects your personal style while minimizing environmental impact.',
    category: 'Lifestyle',
    categorySlug: 'lifestyle',
    featuredImage: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    date: 'April 12, 2023'
  },
  {
    id: 6,
    slug: 'japan-food-guide',
    title: 'A Foodie\'s Guide to Japan: Beyond Sushi and Ramen',
    excerpt: 'Discover Japan\'s lesser-known culinary treasures from regional specialties to hidden local favorites that most tourists never experience.',
    category: 'Travel',
    categorySlug: 'travel',
    featuredImage: 'https://images.unsplash.com/photo-1464093515883-ec948246accb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'February 18, 2023'
  },
  {
    id: 4,
    slug: 'bali-wellness-retreat',
    title: 'My Transformative Experience at a Bali Wellness Retreat',
    excerpt: 'How a week-long wellness retreat in Bali changed my perspective on self-care and helped me establish healthier habits.',
    category: 'Health',
    categorySlug: 'health',
    featuredImage: 'https://images.unsplash.com/photo-1571323511805-9d5202be5366?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'March 20, 2023'
  },
];

const SinglePost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  // In a real implementation, we would fetch the post data based on the slug
  // For now, we'll use our mock data
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Post URL has been copied to clipboard.",
    });
  };
  
  const shareOnSocial = (platform: string) => {
    let url = '';
    const postUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(post.title);
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank');
  };
  
  return (
    <Layout>
      <SEO 
        title={post.title}
        description={post.excerpt}
        type="article"
        image={post.featuredImage}
        publishedAt={post.date}
        category={post.category}
      />
      
      <article className="pt-24 pb-16">
        {/* Post Header */}
        <header className="container-lg mb-10">
          <div className="max-w-4xl mx-auto">
            <Link 
              to={`/category/${post.categorySlug}`}
              className="inline-block bg-gold text-white text-sm px-3 py-1 rounded-full mb-4 hover:bg-opacity-90 transition-opacity"
            >
              {post.category}
            </Link>
            
            <h1 className="title-xl mb-6">{post.title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 text-gray-600">
              <div className="flex items-center">
                <img 
                  src={post.authorImage}
                  alt={post.author}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <span className="block font-medium text-charcoal">{post.author}</span>
                  <div className="flex items-center text-sm">
                    <span className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => shareOnSocial('facebook')}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => shareOnSocial('twitter')}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => shareOnSocial('linkedin')}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Copy link to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Featured Image */}
        <div className="container-lg mb-10">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-[16/9] rounded-lg overflow-hidden">
              <img 
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container-lg mb-12">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose lg:prose-lg mx-auto"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
        
        {/* Share & Tags */}
        <div className="container-lg border-t border-b py-6 mb-12">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">Tags:</span>
              <Link 
                to="/tag/travel"
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                Travel
              </Link>
              <Link 
                to="/tag/italy"
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                Italy
              </Link>
              <Link 
                to="/tag/beaches"
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                Beaches
              </Link>
            </div>
            
            <div className="flex items-center">
              <span className="mr-2 font-medium">Share:</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => shareOnSocial('facebook')}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => shareOnSocial('twitter')}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => shareOnSocial('linkedin')}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Copy link to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ad Section */}
        <AdSection />
        
        {/* Related Posts */}
        <section className="container-lg py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="title-md mb-8">You Might Also Like</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <PostCard key={post.id} post={post} size="small" />
              ))}
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default SinglePost;
