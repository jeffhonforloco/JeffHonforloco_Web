
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

interface Media {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  source_url: string;
  alt_text?: string;
  media_details?: {
    width: number;
    height: number;
    file: string;
    sizes?: Record<string, {
      file: string;
      width: number;
      height: number;
      source_url: string;
    }>;
  };
}

interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// WordPress REST API base URLs
const API_URL = 'https://api.jeffhonforloco.com/wp-json/wp/v2';
const MENU_API_URL = 'https://api.jeffhonforloco.com/wp-json/menus/v1/menus';

// Authentication credentials
const AUTH_USERNAME = 'developer';
const AUTH_PASSWORD = 'RmIakDsJWn!px64RUwXzyI0x';

// Helper function to create Authorization header
const getAuthHeader = (): Headers => {
  const headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa(`${AUTH_USERNAME}:${AUTH_PASSWORD}`));
  return headers;
};

// Helper function for API requests with authentication
const fetchWithAuth = async (url: string): Promise<Response> => {
  try {
    const headers = getAuthHeader();
    return await fetch(url, { headers });
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    // If authentication fails, fallback to public access
    return fetch(url);
  }
};

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
    const response = await fetchWithAuth(url);
    
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
    const response = await fetchWithAuth(`${API_URL}/categories?per_page=100`);
    
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
    const response = await fetchWithAuth(`${API_URL}/categories?slug=${encodeURIComponent(slug)}`);
    
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
    
    const response = await fetchWithAuth(`${API_URL}/posts?_embed&categories=${category.id}&page=${page}&per_page=${perPage}`);
    
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
    const response = await fetchWithAuth(`${API_URL}/pages?_embed&slug=${encodeURIComponent(slug)}`);
    
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
    const response = await fetchWithAuth(`${API_URL}/tags?slug=${encodeURIComponent(tagSlug)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tag with slug ${tagSlug}: ${response.status}`);
    }
    
    const tags = await response.json();
    if (tags.length === 0) {
      return { posts: [], totalPages: 0 };
    }
    
    const tagId = tags[0].id;
    const postsResponse = await fetchWithAuth(`${API_URL}/posts?_embed&tags=${tagId}&page=${page}&per_page=${perPage}`);
    
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
    const response = await fetchWithAuth(`${MENU_API_URL}/${menuSlug}`);
    
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

// New function to get all pages
export const getAllPages = async (page: number = 1, perPage: number = 20): Promise<{ pages: Page[]; totalPages: number }> => {
  try {
    const response = await fetchWithAuth(`${API_URL}/pages?_embed&page=${page}&per_page=${perPage}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.status}`);
    }
    
    const pages: Page[] = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    
    return { pages, totalPages };
  } catch (error) {
    console.error('Error fetching all pages:', error);
    return { pages: [], totalPages: 0 };
  }
};

// Get all media items
export const getMedia = async (page: number = 1, perPage: number = 20): Promise<{ media: Media[]; totalPages: number }> => {
  try {
    const response = await fetchWithAuth(`${API_URL}/media?page=${page}&per_page=${perPage}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.status}`);
    }
    
    const media: Media[] = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    
    return { media, totalPages };
  } catch (error) {
    console.error('Error fetching media:', error);
    return { media: [], totalPages: 0 };
  }
};

// Get all tags
export const getTags = async (page: number = 1, perPage: number = 100): Promise<{ tags: Tag[]; totalPages: number }> => {
  try {
    const response = await fetchWithAuth(`${API_URL}/tags?page=${page}&per_page=${perPage}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.status}`);
    }
    
    const tags: Tag[] = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    
    return { tags, totalPages };
  } catch (error) {
    console.error('Error fetching tags:', error);
    return { tags: [], totalPages: 0 };
  }
};

// Get latest posts with full content
export const getLatestPosts = async (count: number = 10): Promise<Post[]> => {
  return getPosts({
    perPage: count,
    orderBy: 'date',
    order: 'desc'
  });
};

// Get homepage content
export const getHomepageContent = async (): Promise<{ featuredPost: Post | null; recentPosts: Post[]; popularCategories: Category[] }> => {
  try {
    // Get featured/latest post
    const posts = await getPosts({ perPage: 1 });
    const featuredPost = posts.length > 0 ? posts[0] : null;
    
    // Get recent posts (excluding the featured one)
    const recentPosts = await getPosts({ perPage: 6, page: 1 });
    
    // Get popular categories (those with most posts)
    const categories = await getCategories();
    const popularCategories = categories
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return {
      featuredPost,
      recentPosts: recentPosts.filter(post => featuredPost ? post.id !== featuredPost.id : true),
      popularCategories
    };
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return { featuredPost: null, recentPosts: [], popularCategories: [] };
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
  const seoCanonical = post.yoast_head_json?.canonical || `https://api.jeffhonforloco.com/post/${post.slug}`;
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

// Helper to transform a WordPress page
export const transformPage = (page: Page) => {
  if (!page) return null;
  
  const featuredMedia = page._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = featuredMedia?.source_url || '/placeholder.svg';
  
  const title = typeof page.title === 'string' ? page.title : page.title?.rendered || '';
  const content = typeof page.content === 'string' ? page.content : page.content?.rendered || '';
  const excerpt = typeof page.excerpt === 'string' ? page.excerpt : page.excerpt?.rendered || '';
  
  // Get SEO data from Yoast if available
  const seoTitle = page.yoast_head_json?.title || title;
  const seoDescription = page.yoast_head_json?.description || stripHtml(excerpt).substring(0, 160);
  const seoCanonical = page.yoast_head_json?.canonical || `https://api.jeffhonforloco.com/${page.slug}`;
  const seoRobots = page.yoast_head_json?.robots || { index: 'index', follow: 'follow' };

  return {
    id: page.id,
    slug: page.slug,
    title: title,
    content: content,
    excerpt: excerpt,
    featuredImage,
    modified: page.modified ? formatDate(page.modified) : '',
    seo: {
      title: seoTitle,
      description: seoDescription,
      canonical: seoCanonical,
      robots: seoRobots
    }
  };
};

// Function to sync all WordPress content
export const syncAllContent = async (): Promise<{
  success: boolean;
  postsCount: number;
  pagesCount: number; 
  categoriesCount: number;
  tagsCount: number;
  mediaCount: number;
}> => {
  try {
    console.log('Starting WordPress content sync...');
    
    // Fetch all content types in parallel
    const [
      { pages, totalPages: totalPagesCount },
      { posts: allPosts, totalPages: totalPostsPages },
      allCategories,
      { tags, totalPages: totalTagsPages },
      { media, totalPages: totalMediaPages }
    ] = await Promise.all([
      getAllPages(1, 100),
      getPostsBatch(1, 100),
      getCategories(),
      getTags(1, 100),
      getMedia(1, 100)
    ]);
    
    console.log(`Initial sync completed: ${allPosts.length} posts, ${pages.length} pages, ${allCategories.length} categories, ${tags.length} tags, ${media.length} media items`);
    
    // Additional fetches for remaining content if needed
    let remainingPosts: Post[] = [];
    let remainingPages: Page[] = [];
    let remainingTags: Tag[] = [];
    let remainingMedia: Media[] = [];
    
    // Fetch remaining posts if any
    if (totalPostsPages > 1) {
      const promises = [];
      for (let i = 2; i <= totalPostsPages && i <= 10; i++) { // Limit to 10 pages to avoid too many requests
        promises.push(getPosts({ page: i, perPage: 100 }));
      }
      const results = await Promise.all(promises);
      remainingPosts = results.flat();
    }
    
    // Fetch remaining pages if any
    if (totalPagesCount > 1) {
      const promises = [];
      for (let i = 2; i <= totalPagesCount && i <= 5; i++) {
        promises.push(getAllPages(i, 100).then(res => res.pages));
      }
      const results = await Promise.all(promises);
      remainingPages = results.flat();
    }
    
    // Fetch remaining tags if any
    if (totalTagsPages > 1) {
      const promises = [];
      for (let i = 2; i <= totalTagsPages && i <= 3; i++) {
        promises.push(getTags(i, 100).then(res => res.tags));
      }
      const results = await Promise.all(promises);
      remainingTags = results.flat();
    }
    
    // Fetch remaining media if any
    if (totalMediaPages > 1) {
      const promises = [];
      for (let i = 2; i <= totalMediaPages && i <= 3; i++) {
        promises.push(getMedia(i, 100).then(res => res.media));
      }
      const results = await Promise.all(promises);
      remainingMedia = results.flat();
    }
    
    const totalPosts = [...allPosts, ...remainingPosts];
    const totalPages = [...pages, ...remainingPages];
    const totalTags = [...tags, ...remainingTags];
    const totalMedia = [...media, ...remainingMedia];
    
    console.log(`Full sync completed: ${totalPosts.length} posts, ${totalPages.length} pages, ${allCategories.length} categories, ${totalTags.length} tags, ${totalMedia.length} media items`);
    
    return {
      success: true,
      postsCount: totalPosts.length,
      pagesCount: totalPages.length,
      categoriesCount: allCategories.length,
      tagsCount: totalTags.length,
      mediaCount: totalMedia.length
    };
  } catch (error) {
    console.error('Error syncing WordPress content:', error);
    return {
      success: false,
      postsCount: 0,
      pagesCount: 0,
      categoriesCount: 0,
      tagsCount: 0,
      mediaCount: 0
    };
  }
};

// Helper function to get posts in batches
const getPostsBatch = async (page: number = 1, perPage: number = 100): Promise<{ posts: Post[], totalPages: number }> => {
  try {
    const response = await fetchWithAuth(`${API_URL}/posts?_embed&page=${page}&per_page=${perPage}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts batch: ${response.status}`);
    }
    
    const posts: Post[] = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    
    return { posts, totalPages };
  } catch (error) {
    console.error('Error fetching posts batch:', error);
    return { posts: [], totalPages: 0 };
  }
};
