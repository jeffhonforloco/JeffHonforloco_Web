
interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
      caption?: {
        rendered: string;
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      description?: string;
    }>>;
    author?: Array<{
      name: string;
      url?: string;
    }>;
  };
  date: string;
  modified?: string;
  yoast_head_json?: {
    title?: string;
    description?: string;
    robots?: {
      index?: string;
      follow?: string;
    };
    canonical?: string;
    og_title?: string;
    og_description?: string;
    og_image?: Array<{
      url: string;
      width?: number;
      height?: number;
    }>;
    twitter_card?: string;
    twitter_title?: string;
    twitter_description?: string;
    twitter_image?: string;
    schema?: {
      '@graph': any[];
    };
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  yoast_head_json?: {
    title?: string;
    description?: string;
    robots?: {
      index?: string;
      follow?: string;
    };
    canonical?: string;
  };
}

interface Page {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
  modified?: string;
  yoast_head_json?: {
    title?: string;
    description?: string;
    robots?: {
      index?: string;
      follow?: string;
    };
    canonical?: string;
  };
}

interface Menu {
  items: Array<{
    id: number;
    title: string;
    url: string;
    object_slug: string;
    child_items?: Array<{
      id: number;
      title: string;
      url: string;
      object_slug: string;
    }>;
  }>;
}

// Replace this with your WordPress REST API base URL
const API_URL = 'https://www.jeffhonforloco.com/wp-json/wp/v2';
const MENU_API_URL = 'https://www.jeffhonforloco.com/wp-json/menus/v1/menus';

// Helper function to strip HTML tags
export const stripHtml = (html: string): string => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper for more comprehensive date formatting
export const formatDateWithSchema = (dateString: string): { 
  display: string; 
  schema: string; 
} => {
  if (!dateString) return { display: '', schema: '' };
  const date = new Date(dateString);
  return {
    display: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    schema: date.toISOString()
  };
};

// Get all posts with optional arguments
export const getPosts = async (args: {
  page?: number;
  perPage?: number;
  categories?: number[];
  search?: string;
  slug?: string;
  tags?: number[];
  orderBy?: string;
  order?: 'asc' | 'desc';
  before?: string;
  after?: string;
} = {}): Promise<Post[]> => {
  const { 
    page = 1, 
    perPage = 10, 
    categories, 
    search, 
    slug, 
    tags,
    orderBy = 'date',
    order = 'desc',
    before,
    after
  } = args;
  
  let url = `${API_URL}/posts?_embed&page=${page}&per_page=${perPage}&orderby=${orderBy}&order=${order}`;
  
  if (categories && categories.length > 0) {
    url += `&categories=${categories.join(',')}`;
  }
  
  if (tags && tags.length > 0) {
    url += `&tags=${tags.join(',')}`;
  }
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  if (slug) {
    url += `&slug=${encodeURIComponent(slug)}`;
  }
  
  if (before) {
    url += `&before=${encodeURIComponent(before)}`;
  }
  
  if (after) {
    url += `&after=${encodeURIComponent(after)}`;
  }
  
  try {
    console.log(`Fetching posts with URL: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts: Post[] = await response.json();
    console.log(`Found ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Get a single post by slug
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const posts = await getPosts({ slug, perPage: 1 });
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
};

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_URL}/categories?per_page=100`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    
    const categories: Category[] = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Get a single category by slug
export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  try {
    const response = await fetch(`${API_URL}/categories?slug=${encodeURIComponent(slug)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch category with slug ${slug}: ${response.status}`);
    }
    
    const categories: Category[] = await response.json();
    return categories.length > 0 ? categories[0] : null;
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
};

// Get posts by category slug
export const getPostsByCategory = async (
  categorySlug: string,
  page: number = 1,
  perPage: number = 10
): Promise<{ posts: Post[]; category: Category | null; totalPages: number }> => {
  try {
    const category = await getCategoryBySlug(categorySlug);
    
    if (!category) {
      return { posts: [], category: null, totalPages: 0 };
    }
    
    const response = await fetch(`${API_URL}/posts?_embed&categories=${category.id}&page=${page}&per_page=${perPage}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts for category ${categorySlug}: ${response.status}`);
    }
    
    const posts: Post[] = await response.json();
    
    // Extract total pages from headers
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    
    return { posts, category, totalPages };
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return { posts: [], category: null, totalPages: 0 };
  }
};

// Get a page by slug
export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  try {
    console.log(`Fetching page with slug: ${slug}`);
    const response = await fetch(`${API_URL}/pages?_embed&slug=${encodeURIComponent(slug)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch page with slug ${slug}: ${response.status}`);
    }
    
    const pages: Page[] = await response.json();
    if (pages.length > 0) {
      console.log(`Found page with slug ${slug}`);
    } else {
      console.log(`No page found with slug ${slug}`);
    }
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }
};

// Get posts by tag slug
export const getPostsByTag = async (
  tagSlug: string,
  page: number = 1,
  perPage: number = 10
): Promise<{ posts: Post[]; totalPages: number }> => {
  try {
    const response = await fetch(`${API_URL}/tags?slug=${encodeURIComponent(tagSlug)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tag with slug ${tagSlug}: ${response.status}`);
    }
    
    const tags = await response.json();
    if (tags.length === 0) {
      return { posts: [], totalPages: 0 };
    }
    
    const tagId = tags[0].id;
    const postsResponse = await fetch(`${API_URL}/posts?_embed&tags=${tagId}&page=${page}&per_page=${perPage}`);
    
    if (!postsResponse.ok) {
      throw new Error(`Failed to fetch posts for tag ${tagSlug}: ${postsResponse.status}`);
    }
    
    const posts: Post[] = await postsResponse.json();
    
    // Extract total pages from headers
    const totalPages = parseInt(postsResponse.headers.get('X-WP-TotalPages') || '0', 10);
    
    return { posts, totalPages };
  } catch (error) {
    console.error(`Error fetching posts for tag ${tagSlug}:`, error);
    return { posts: [], totalPages: 0 };
  }
};

// Get site navigation menu
export const getMenu = async (menuSlug: string = 'main-menu'): Promise<Menu | null> => {
  try {
    const response = await fetch(`${MENU_API_URL}/${menuSlug}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch menu ${menuSlug}: ${response.status}`);
    }
    
    const menu: Menu = await response.json();
    return menu;
  } catch (error) {
    console.error(`Error fetching menu ${menuSlug}:`, error);
    return null;
  }
};

// Get trending posts 
export const getTrendingPosts = async (count: number = 5): Promise<Post[]> => {
  try {
    // For now, we'll mimic trending posts by getting the most recent
    // In a real implementation, you might use view counts or other metrics
    return getPosts({ 
      perPage: count,
      orderBy: 'date',
      order: 'desc'
    });
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    return [];
  }
};

// Get featured posts
export const getFeaturedPosts = async (count: number = 6): Promise<Post[]> => {
  try {
    // In a real implementation, you might have a "featured" tag or category
    // For now, we'll use the most recent posts
    return getPosts({
      perPage: count, 
      orderBy: 'date', 
      order: 'desc'
    });
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

// Helper to transform WordPress post to simplified format
export const transformPost = (post: Post) => {
  if (!post) return null;
  
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = featuredMedia?.source_url || '/placeholder.svg';
  const featuredImageAlt = featuredMedia?.alt_text || '';
  
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const category = categories.length > 0 ? categories[0] : { name: 'Uncategorized', slug: 'uncategorized' };
  
  const tags = post._embedded?.['wp:term']?.[1] || [];
  
  // Get author information
  const author = post._embedded?.author?.[0]?.name || 'Jeff HonForLoco';
  
  // Ensure we're handling the excerpt and content correctly
  const excerpt = typeof post.excerpt === 'string' ? post.excerpt : post.excerpt?.rendered || '';
  const content = typeof post.content === 'string' ? post.content : post.content?.rendered || '';
  const title = typeof post.title === 'string' ? post.title : post.title?.rendered || '';

  // Get modified date if available
  const modified = post.modified || post.date;
  
  // Format both dates
  const formattedDate = formatDate(post.date);
  const formattedModified = formatDate(modified);
  
  // Get SEO data from Yoast if available
  const seoTitle = post.yoast_head_json?.title || title;
  const seoDescription = post.yoast_head_json?.description || stripHtml(excerpt).substring(0, 160);
  const seoCanonical = post.yoast_head_json?.canonical || `https://www.jeffhonforloco.com/post/${post.slug}`;
  const seoRobots = post.yoast_head_json?.robots || { index: 'index', follow: 'follow' };
  
  // Calculate word count for content
  const wordCount = stripHtml(content).split(/\s+/).length;
  
  // Calculate reading time (average 225 words per minute)
  const readingTime = Math.ceil(wordCount / 225);

  return {
    id: post.id,
    slug: post.slug,
    title: title,
    excerpt: excerpt,
    content: content,
    featuredImage,
    featuredImageAlt,
    category: category.name,
    categorySlug: category.slug,
    tags: tags.map(tag => tag.name),
    tagSlugs: tags.map(tag => tag.slug),
    author,
    date: formattedDate,
    modified: formattedModified,
    rawDate: post.date,
    rawModified: modified,
    wordCount,
    readingTime: `${readingTime} min read`,
    seo: {
      title: seoTitle,
      description: seoDescription,
      canonical: seoCanonical,
      robots: seoRobots
    }
  };
};
