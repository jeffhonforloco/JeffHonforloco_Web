
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  wordCount?: number;
  keywords?: string;
  language?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  schema?: object; // Custom schema
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Explore lifestyle, travel, and personal growth with Jeff HonForLoco. Discover insights, tips, and stories to inspire your journey.',
  canonical = 'https://www.jeffhonforloco.com',
  image = '/og-image.jpg',
  type = 'website',
  publishedAt,
  updatedAt,
  author = 'Jeff HonForLoco',
  category,
  tags,
  readingTime,
  wordCount,
  keywords = 'lifestyle, travel, personal growth, blogging, jeff honforloco',
  language = 'en_US',
  noIndex = false,
  noFollow = false,
  schema,
}) => {
  const siteUrl = 'https://www.jeffhonforloco.com';
  const fullTitle = `${title} | Jeff HonForLoco`;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  // Enhanced article schema with more properties
  const articleSchema = type === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author,
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jeff HonForLoco',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    wordCount: wordCount,
    articleSection: category,
    keywords: keywords,
    // New fields for enhanced SEO
    inLanguage: language,
    copyrightYear: new Date(publishedAt || new Date()).getFullYear(),
    ...(readingTime && { timeRequired: `PT${readingTime.replace(/\D/g, '')}M` }),
  } : null;

  // Enhanced website schema with more properties
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: 'Jeff HonForLoco',
    description: description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    // New fields
    inLanguage: language,
    copyrightHolder: {
      '@type': 'Person',
      name: 'Jeff HonForLoco',
      url: `${siteUrl}/about`,
    },
  };

  // Person schema for author information
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jeff HonForLoco',
    url: `${siteUrl}/about`,
    sameAs: [
      'https://www.facebook.com/people/Jeff-Honforloco/61551819509232/',
      'https://www.instagram.com/jeffhonforloco',
      'https://www.youtube.com/@jeffhonforloco',
      'https://x.com/jeffhonforloco',
      'https://www.tiktok.com/@jeffhonforloco',
      'https://www.linkedin.com/in/jeffhonforloco/'
    ],
    jobTitle: 'Lifestyle & Travel Blogger',
    worksFor: {
      '@type': 'Organization',
      name: 'Jeff HonForLoco Blog'
    }
  };

  // Determine which schema to use
  const schemaToUse = schema || (type === 'article' ? articleSchema : websiteSchema);
  
  return (
    <Helmet>
      {/* Basic tags */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Robots control */}
      {noIndex || noFollow ? (
        <meta name="robots" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />
      ) : null}
      
      {/* Open Graph tags */}
      <meta property="og:site_name" content="Jeff HonForLoco" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={language} />
      
      {/* Article specific Open Graph tags */}
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {updatedAt && <meta property="article:modified_time" content={updatedAt} />}
      {category && <meta property="article:section" content={category} />}
      {tags && tags.map(tag => <meta property="article:tag" content={tag} key={tag} />)}
      {author && <meta property="article:author" content={author} />}
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@jeffhonforloco" />
      
      {/* Additional mobile and compatibility tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Jeff HonForLoco" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaToUse)}
      </script>

      {/* Person schema */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>

      {/* BreadcrumbList schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: title,
              item: canonical,
            },
          ],
        })}
      </script>

      {/* Organization structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Jeff HonForLoco',
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          sameAs: [
            'https://twitter.com/jeffhonforloco',
            'https://www.facebook.com/jeffhonforloco',
            'https://www.instagram.com/jeffhonforloco',
            'https://www.linkedin.com/in/jeffhonforloco',
            'https://www.pinterest.com/jeffhonforloco/',
            'https://bsky.app/profile/jeffhonforloco.bsky.social',
            'https://www.reddit.com/user/jeffhonforloco/',
            'https://www.threads.net/@jeffhonforloco',
            'https://www.tumblr.com/jeffhonforloco'
          ],
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
