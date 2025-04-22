/**
 * Transforms a WordPress post object into a standardized format
 * with correct image handling
 */
export const transformPost = (post) => {
    if (!post) return null;
    
    try {
      // Extract featured image URL using multiple possible sources
      let featuredImageUrl = null;
      
      // Check for embedded featured media (standard WP REST API approach)
      if (post._embedded && 
          post._embedded['wp:featuredmedia'] && 
          post._embedded['wp:featuredmedia'][0]) {
        featuredImageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      }
      // Check for Jetpack's featured media URL
      else if (post.jetpack_featured_media_url) {
        featuredImageUrl = post.jetpack_featured_media_url;
      }
      // Check for featured media ID and attempt to construct URL if available
      else if (post.featured_media && post.featured_media > 0) {
        // Store the ID so we can potentially fetch it later
        // This is just a fallback flag - we'll handle it in the PostCard
        post.has_featured_media_id = post.featured_media;
      }
      
      // Create a standardized post object
      const transformedPost = {
        ...post,
        // Keep existing fields
        id: post.id,
        date: post.date,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        
        // Add explicit featured image URL field for PostCard component
        featured_image_url: featuredImageUrl,
        
        // Keep the original _embedded data if available
        _embedded: post._embedded,
        
        // Add post type for different styling if needed
        postType: post.type || 'post'
      };
      
      return transformedPost;
    } catch (error) {
      console.error("Error transforming post:", error, post);
      return post; // Return original post as fallback
    }
  };
  
  /**
   * Fetches posts from WordPress with proper _embed parameter
   * to ensure featured images are included
   */
  export const getPosts = async ({
    search = '',
    perPage = 10,
    page = 1,
    orderBy = 'date',
    order = 'desc',
    categories = [],
    tags = [],
    author = '',
    signal = null
  } = {}) => {
    const baseUrl = process.env.REACT_APP_WP_API_URL || 'https://api.jeffhonforloco.com/wp-json/wp/v2';
    
    try {
      // Build query parameters
      const params = new URLSearchParams({
        per_page: perPage.toString(),
        page: page.toString(),
        orderby: orderBy,
        order: order,
        _embed: 'true', // Important! This ensures media is embedded
      });
      
      if (search) params.append('search', search);
      if (categories.length) params.append('categories', categories.join(','));
      if (tags.length) params.append('tags', tags.join(','));
      if (author) params.append('author', author);
      
      const requestUrl = `${baseUrl}/posts?${params.toString()}`;
      console.log(`Fetching posts from: ${requestUrl}`);
      
      const response = await fetch(requestUrl, { signal });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }
      
      const posts = await response.json();
      console.log(`Fetched ${posts.length} posts`);
      
      return posts;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Post fetch aborted');
        return [];
      }
      console.error('Error fetching posts:', error);
      return [];
    }
  };