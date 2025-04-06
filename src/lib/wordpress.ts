
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
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
  date: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
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
    }>;
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
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Get all posts with optional arguments
export const getPosts = async (args: {
  page?: number;
  perPage?: number;
  categories?: number[];
  search?: string;
  slug?: string;
} = {}): Promise<Post[]> => {
  const { page = 1, perPage = 10, categories, search, slug } = args;
  
  let url = `${API_URL}/posts?_embed&page=${page}&per_page=${perPage}`;
  
  if (categories && categories.length > 0) {
    url += `&categories=${categories.join(',')}`;
  }
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  if (slug) {
    url += `&slug=${encodeURIComponent(slug)}`;
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts: Post[] = await response.json();
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
): Promise<{ posts: Post[]; category: Category | null }> => {
  try {
    const category = await getCategoryBySlug(categorySlug);
    
    if (!category) {
      return { posts: [], category: null };
    }
    
    const posts = await getPosts({
      categories: [category.id],
      page,
      perPage,
    });
    
    return { posts, category };
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return { posts: [], category: null };
  }
};

// Get a page by slug
export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  try {
    const response = await fetch(`${API_URL}/pages?_embed&slug=${encodeURIComponent(slug)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch page with slug ${slug}: ${response.status}`);
    }
    
    const pages: Page[] = await response.json();
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
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

// Helper to transform WordPress post to simplified format
export const transformPost = (post: Post) => {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'placeholder.svg';
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const category = categories.length > 0 ? categories[0] : { name: 'Uncategorized', slug: 'uncategorized' };
  
  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    featuredImage,
    category: category.name,
    categorySlug: category.slug,
    date: formatDate(post.date),
    rawDate: post.date,
  };
};
