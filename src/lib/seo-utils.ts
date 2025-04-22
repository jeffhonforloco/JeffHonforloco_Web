
/**
 * SEO Utility functions for optimizing content
 */

/**
 * Calculates reading time for a given content
 * @param content HTML or text content
 * @returns Object with reading time in minutes and word count
 */
export const calculateReadingTime = (content: string): { minutes: string, count: number } => {
  // Strip HTML tags if present
  const text = content.replace(/<[^>]*>/g, '');
  // Count words
  const wordCount = text.split(/\s+/).length;
  // Calculate reading time (average 225 words per minute)
  const readingTime = Math.ceil(wordCount / 225);
  return { 
    minutes: `${readingTime} min read`,
    count: wordCount
  };
};

/**
 * Extract keywords from content for SEO purposes
 * @param content Main content 
 * @param title Post title
 * @param category Post category
 * @returns Array of keywords
 */
export const extractKeywords = (content: string, title: string, category: string): string[] => {
  // Common words to exclude
  const stopWords = ['this', 'that', 'with', 'from', 'have', 'more', 'other', 'than', 'then', 
    'when', 'what', 'where', 'which', 'while', 'your', 'there', 'their', 'about', 'should'];
  
  // Combine all text
  const allText = `${title} ${category} ${content.replace(/<[^>]*>/g, '')}`;
  
  // Get all words, convert to lowercase and filter
  const words = allText.toLowerCase()
    .split(/\W+/)
    .filter(word => 
      word.length > 3 && 
      !stopWords.includes(word)
    );
  
  // Count occurrences
  const wordCounts: Record<string, number> = {};
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  
  // Get top keywords
  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);
};

/**
 * Generate a slug from a string (for URLs)
 * @param text Input text
 * @returns URL-friendly slug
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

/**
 * Format date for SEO purposes
 * @param date Date string
 * @returns Formatted date for display
 */
export const formatDateForSEO = (date: string): string => {
  const d = new Date(date);
  return d.toISOString();
};

/**
 * Create canonical URL
 * @param path URL path
 * @returns Full canonical URL
 */
export const getCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://api.jeffhonforloco.com';
  // Ensure path starts with a slash
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${formattedPath}`;
};

/**
 * Generate meta description from content
 * @param content HTML content
 * @param maxLength Maximum length for description
 * @returns Optimized meta description
 */
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  
  // Get first paragraph or first X characters
  let description = '';
  const paragraphs = text.split(/\n\s*\n|\r\n\s*\r\n/);
  
  if (paragraphs.length > 0) {
    description = paragraphs[0].trim();
  } else {
    description = text.trim();
  }
  
  // Truncate to maxLength
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  }
  
  return description;
};

/**
 * Analyze content for SEO score
 * @param title Title of the content
 * @param content Main content body
 * @param targetKeyword Primary keyword to target
 * @returns SEO score and improvement suggestions
 */
export const analyzeSEO = (title: string, content: string, targetKeyword: string): { 
  score: number, 
  suggestions: string[] 
} => {
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  const suggestions: string[] = [];
  let score = 100;
  
  // Check title length (ideal: 50-60 characters)
  if (title.length < 30) {
    score -= 10;
    suggestions.push('Title is too short. Aim for 50-60 characters.');
  } else if (title.length > 70) {
    score -= 5;
    suggestions.push('Title is too long. Keep it under 70 characters.');
  }
  
  // Check if target keyword is in title
  if (!title.toLowerCase().includes(targetKeyword.toLowerCase())) {
    score -= 15;
    suggestions.push('Add your target keyword to the title.');
  }
  
  // Check content length (ideal: at least 300 words)
  if (wordCount < 300) {
    score -= 15;
    suggestions.push('Content is too short. Aim for at least 300 words.');
  }
  
  // Check keyword density (ideal: 1-2%)
  const keywordRegex = new RegExp(targetKeyword, 'gi');
  const keywordCount = (text.match(keywordRegex) || []).length;
  const keywordDensity = (keywordCount / wordCount) * 100;
  
  if (keywordDensity < 0.5) {
    score -= 10;
    suggestions.push('Keyword density is too low. Add your target keyword more often.');
  } else if (keywordDensity > 3) {
    score -= 15;
    suggestions.push('Keyword density is too high. Reduce keyword usage to avoid keyword stuffing.');
  }
  
  // Check for headings
  if (!content.includes('<h2') && !content.includes('<h3')) {
    score -= 10;
    suggestions.push('Add subheadings (H2, H3) to structure your content better.');
  }
  
  // Normalize score
  score = Math.max(0, Math.min(100, score));
  
  return { score, suggestions };
};

/**
 * Generate FAQ schema for content
 * @param faqs Array of Question-Answer pairs
 * @returns Schema.org FAQPage JSON object
 */
export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
};

/**
 * Generate product schema for e-commerce
 * @param product Product information
 * @returns Schema.org Product JSON object
 */
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  sku: string;
  availability: string;
  rating?: number;
  reviewCount?: number;
}): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.description,
    'image': product.image,
    'sku': product.sku,
    'offers': {
      '@type': 'Offer',
      'price': product.price,
      'priceCurrency': product.currency,
      'availability': `https://schema.org/${product.availability}`
    },
    ...(product.rating && {
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': product.rating,
        'reviewCount': product.reviewCount || 0
      }
    })
  };
};
