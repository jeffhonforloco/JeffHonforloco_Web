
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
  const baseUrl = 'https://www.jeffhonforloco.com';
  // Ensure path starts with a slash
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${formattedPath}`;
};
