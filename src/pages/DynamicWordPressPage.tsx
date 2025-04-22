import React, { useEffect, useState, useMemo } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  getPageBySlug,
  getPostsByCategory,
  getCategoryBySlug,
  getPosts,
  getPostBySlug,
  transformPost,
} from "@/lib/wordpress";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/shared/SEO";
import PostCard from "@/components/blog/PostCard";
import { Loader2 } from "lucide-react";
import { extractKeywords, getCanonicalUrl } from "@/lib/seo-utils";
import { trackSectionView } from "@/utils/userEngagement";

const DynamicWordPressPage = () => {
  // Retrieve URL parameters (supports multiple names)
  const {
    slug,
    categorySlug,
    storySlug,
    guideSlug,
    recommendationSlug,
    resourceSlug,
    affiliateSlug,
  } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // States for content, loading, error, type, posts, SEO
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageType, setPageType] = useState<
    | "page"
    | "category"
    | "posts"
    | "post"
    | "story"
    | "guide"
    | "recommendation"
    | "resource"
    | "affiliate"
    | "404"
    | null
  >(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [pageKeywords, setPageKeywords] = useState<string[]>([]);
  // Flag to ensure we fetch only once per location change
  const [hasFetched, setHasFetched] = useState(false);

  // Use a memoized value for the current pathname
  const pathKey = useMemo(() => location.pathname, [location.pathname]);

  // Derive contentType and contentSlug from URL path and params
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const contentType = pathSegments[0];
  const computedSlug =
    slug ||
    categorySlug ||
    storySlug ||
    guideSlug ||
    recommendationSlug ||
    resourceSlug ||
    affiliateSlug;
  const contentSlug =
    computedSlug ||
    (pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "");

  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category");
  const canonicalUrl = getCanonicalUrl(location.pathname);

  console.log(
    `DynamicWordPressPage: Path: ${location.pathname}, Type: ${contentType}, Slug: ${contentSlug}`
  );

  // Helper function to strip HTML tags and shorten text
  const safeProcessHtml = (htmlContent: any): string => {
    if (typeof htmlContent === "string") {
      return htmlContent.replace(/<[^>]*>/g, "").substring(0, 160);
    }
    if (
      htmlContent &&
      typeof htmlContent === "object" &&
      "rendered" in htmlContent &&
      typeof htmlContent.rendered === "string"
    ) {
      return htmlContent.rendered.replace(/<[^>]*>/g, "").substring(0, 160);
    }
    return "";
  };

  // Reset states on location change
  useEffect(() => {
    setHasFetched(false);
    setLoading(true);
    setError(null);
    setContent(null);
    setPageType(null);
    setPosts([]);
    setPageTitle("");
    setPageDescription("");
    setPageKeywords([]);
  }, [location.pathname]);

  useEffect(() => {
    if (hasFetched || location.pathname === "/404") return;

    const fetchContent = async () => {
      try {
        console.log(`Fetching content for path: ${location.pathname}`);
        console.log(`Content type: ${contentType}, slug: ${contentSlug}`);

        // --- Special case: Motivation Stories Category ---
        if (
          location.pathname === "/category/motivation-stories" ||
          location.pathname === "/category/motivation-stories/"
        ) {
          const cat = await getCategoryBySlug("motivation-stories");
          if (cat) {
            const { posts: catPosts } = await getPostsByCategory(
              "motivation-stories"
            );
            setContent(cat);
            // Transform posts to ensure proper image handling
            const transformedPosts = catPosts.map(transformPost).filter(Boolean);
            setPosts(transformedPosts);
            setPageType("category");
            setPageTitle(cat.name || "Motivation Stories");
            setPageDescription(
              cat.description || "Read inspiring motivation stories."
            );
            setPageKeywords([
              "motivation",
              "stories",
              "inspiration",
              "personal development",
            ]);
            setLoading(false);
            setHasFetched(true);
            return;
          }
        }

        // --- Special case: Overcoming Challenges Subcategory ---
        if (
          location.pathname ===
            "/category/motivation-stories/overcoming-challenges" ||
          location.pathname ===
            "/category/motivation-stories/overcoming-challenges/"
        ) {
          const cat = await getCategoryBySlug("overcoming-challenges");
          if (cat) {
            const { posts: catPosts } = await getPostsByCategory(
              "overcoming-challenges"
            );
            setContent(cat);
            // Transform posts to ensure proper image handling
            const transformedPosts = catPosts.map(transformPost).filter(Boolean);
            setPosts(transformedPosts);
            setPageType("category");
            setPageTitle(cat.name || "Overcoming Challenges");
            setPageDescription(
              cat.description || "Read stories about overcoming challenges."
            );
            setPageKeywords(["overcoming challenges", "motivation", "stories"]);
            setLoading(false);
            setHasFetched(true);
            return;
          } else {
            const fetchedPosts = await getPosts({
              search: "overcoming challenges",
              perPage: 12,
              orderBy: "date",
              order: "desc",
            });
            // Transform posts to ensure proper image handling
            const transformedPosts = fetchedPosts.map(transformPost).filter(Boolean);
            setPageTitle("Overcoming Challenges");
            setPageDescription("Stories about overcoming obstacles.");
            setPageKeywords(["overcoming challenges", "motivation"]);
            setPosts(transformedPosts);
            setPageType("category");
            setContent({
              name: "Overcoming Challenges",
              description: "Stories about overcoming obstacles.",
            });
            setLoading(false);
            setHasFetched(true);
            return;
          }
        }

        // --- Handle Special Content Types ---
        if (
          [
            "stories",
            "story",
            "affiliate",
            "recommendations",
            "recommendation",
            "resources",
            "resource",
          ].includes(contentType)
        ) {
          let sectionTitle = "";
          let searchQuery = "";
          let sectionDescription = "";
          let pageTypeValue:
            | "story"
            | "affiliate"
            | "recommendation"
            | "resource"
            | "posts" = "posts";

          switch (contentType) {
            case "stories":
            case "story":
              sectionTitle = contentSlug
                ? `${contentSlug.replace(/-/g, " ")} Stories`
                : "Personal Stories";
              searchQuery = contentSlug || "story";
              sectionDescription = `Discover ${
                contentSlug ? contentSlug.replace(/-/g, " ") + " " : ""
              }personal stories.`;
              pageTypeValue = "story";
              break;
            case "affiliate":
              sectionTitle = contentSlug
                ? `${contentSlug.replace(/-/g, " ")} Resources`
                : "Affiliate Resources";
              searchQuery = contentSlug || "affiliate";
              sectionDescription = `Recommended products and services.`;
              pageTypeValue = "affiliate";
              break;
            case "recommendations":
            case "recommendation":
              sectionTitle = contentSlug
                ? `${contentSlug.replace(/-/g, " ")} Recommendations`
                : "Recommendations";
              searchQuery = contentSlug || "recommendation";
              sectionDescription = `Top recommendations and reviews.`;
              pageTypeValue = "recommendation";
              break;
            case "resources":
            case "resource":
              sectionTitle = contentSlug
                ? `${contentSlug.replace(/-/g, " ")} Resources`
                : "Resources";
              searchQuery = contentSlug || "resource";
              sectionDescription = `Resources and tools to help you succeed.`;
              pageTypeValue = "resource";
              break;
          }

          // Try to fetch a specific page matching "contentType/contentSlug"
          const specificPage = await getPageBySlug(
            `${contentType}/${contentSlug || ""}`
          );
          if (specificPage) {
            // Extract safeTitle as a string
            const safeTitle =
              typeof specificPage.title === "string"
                ? specificPage.title // If title is already a string
                : specificPage.title?.rendered || ""; // If title is an object, use 'rendered' or fallback to ''

            setContent(specificPage);
            setPageType("page");
            setPageTitle(safeTitle); // safeTitle is guaranteed to be a string

            // Extract the description and ensure it's a string
            const description = specificPage.excerpt?.rendered || "";
            setPageDescription(safeProcessHtml(description));

            const safeContent = specificPage.content?.rendered || "";
            const keywords = extractKeywords(safeContent, safeTitle, "");
            setPageKeywords(keywords);
            setLoading(false);
            setHasFetched(true);
            return;
          }

          console.log(
            `Fetching posts for ${contentType} with search query: ${searchQuery}`
          );
          const fetchedPosts = await getPosts({
            search: searchQuery,
            perPage: 12,
            orderBy: "date",
            order: "desc",
          });
          if (fetchedPosts && fetchedPosts.length > 0) {
            // Transform posts to ensure proper image handling
            const transformedPosts = fetchedPosts.map(transformPost).filter(Boolean);
            setPageTitle(sectionTitle);
            setPageDescription(sectionDescription);
            setPageKeywords([
              contentType,
              searchQuery,
              "jeff honforloco",
              "blog",
            ]);
            setPosts(transformedPosts);
            setPageType(pageTypeValue);
            setLoading(false);
            setHasFetched(true);
            return;
          } else {
            // No posts found; set default content
            setPageTitle(sectionTitle);
            setPageDescription(sectionDescription);
            setPageKeywords([contentType, "jeff honforloco", "blog"]);
            setPosts([]);
            setPageType(pageTypeValue);
            setContent({
              title: { rendered: sectionTitle },
              content: {
                rendered: `<p>${sectionDescription}</p><p>Content coming soon.</p>`,
              },
            });
            setLoading(false);
            setHasFetched(true);
            return;
          }
        }

        // --- Handle Single Post ---
        if (contentType === "post" && contentSlug) {
          console.log(`Trying to fetch post with slug: ${contentSlug}`);
          const post = await getPostBySlug(contentSlug);
          if (post) {
            setContent(post);
            setPageType("post");
            const postTitle = post.title?.rendered || "";
            setPageTitle(postTitle);
            setPageDescription(safeProcessHtml(post.excerpt));
            const postContent = post.content?.rendered || "";
            const keywords = extractKeywords(postContent, postTitle, "");
            setPageKeywords(keywords);
            setLoading(false);
            setHasFetched(true);
            return;
          } else {
            // No post found, set 404 state
            setPageType("404");
            setLoading(false);
            setHasFetched(true);
            return;
          }
        }

        // --- Try Fetching as a Page Using Full Path or Combined Slug ---
        if (pathSegments.length >= 2) {
          const fullPath = location.pathname.startsWith("/")
            ? location.pathname.substring(1)
            : location.pathname;
          console.log(`Trying to fetch page with full path: ${fullPath}`);
          const pageByFullPath = await getPageBySlug(fullPath);
          if (pageByFullPath) {
            setContent(pageByFullPath);
            setPageType("page");
            const fullTitle = pageByFullPath.title?.rendered || "";
            setPageTitle(fullTitle);
            setPageDescription(safeProcessHtml(pageByFullPath.excerpt));
            const fullKeywords = extractKeywords(
              pageByFullPath.content?.rendered || "",
              fullTitle,
              ""
            );
            setPageKeywords(fullKeywords);
            setLoading(false);
            setHasFetched(true);
            return;
          }
          const combinedSlug = pathSegments.join("-");
          console.log(
            `Trying to fetch page with combined slug: ${combinedSlug}`
          );
          const pageByCombinedSlug = await getPageBySlug(combinedSlug);
          if (pageByCombinedSlug) {
            setContent(pageByCombinedSlug);
            setPageType("page");
            const combTitle = pageByCombinedSlug.title?.rendered || "";
            setPageTitle(combTitle);
            setPageDescription(safeProcessHtml(pageByCombinedSlug.excerpt));
            const combKeywords = extractKeywords(
              pageByCombinedSlug.content?.rendered || "",
              combTitle,
              ""
            );
            setPageKeywords(combKeywords);
            setLoading(false);
            setHasFetched(true);
            return;
          }
          // Special navigation for travel tips
          if (
            pathSegments[0] === "travel" &&
            (pathSegments[1] === "tips" || pathSegments[1] === "budget-tips")
          ) {
            const tipCategory =
              pathSegments[2] ||
              (pathSegments[1] === "budget-tips" ? "budget" : "");
            if (tipCategory) {
              navigate(`/travel/tips/${tipCategory}`, { replace: true });
            } else {
              navigate("/travel/tips/general", { replace: true });
            }
            setHasFetched(true);
            return;
          }
        }

        // --- Try More Generic Page Fetching ---
        let pageResult;
        if (contentSlug) {
          pageResult = await getPageBySlug(contentSlug);
        }
        if (
          !pageResult &&
          contentType &&
          contentSlug &&
          contentType !== contentSlug
        ) {
          pageResult = await getPageBySlug(`${contentType}/${contentSlug}`);
        }
        if (!pageResult && location.pathname) {
          const fullPath = location.pathname.startsWith("/")
            ? location.pathname.substring(1)
            : location.pathname;
          pageResult = await getPageBySlug(fullPath);
        }
        if (pageResult) {
          setContent(pageResult);
          setPageType("page");
          const finalTitle =
            pageResult.title?.rendered || pageResult.title || "";
          setPageTitle(finalTitle);
          setPageDescription(safeProcessHtml(pageResult.excerpt));
          const finalKeywords = extractKeywords(
            pageResult.content?.rendered || "",
            finalTitle,
            ""
          );
          setPageKeywords(finalKeywords);
          setLoading(false);
          setHasFetched(true);
          return;
        }

        // --- Try Fetching as a Category ---
        let categoryToUse = categoryParam || contentSlug;
        if (categoryToUse) {
          console.log(`Trying as category: ${categoryToUse}`);
          const { category, posts: categoryPosts } = await getPostsByCategory(
            categoryToUse
          );
          if (category) {
            setContent(category);
            // Transform posts to ensure proper image handling
            const transformedPosts = categoryPosts.map(transformPost).filter(Boolean);
            setPosts(transformedPosts);
            setPageType("category");
            setPageTitle(category.name);
            setPageDescription(
              category.description || `Browse all posts in ${category.name}`
            );
            setPageKeywords([
              category.name.toLowerCase(),
              "blog",
              "articles",
              "posts",
            ]);
            setLoading(false);
            setHasFetched(true);
            return;
          }
        }

        // --- Finally, try a generic posts search for some content type (e.g. travel) ---
        if (contentType) {
          let sectionTitle = "";
          let searchQuery = "";
          let sectionDescription = "";
          switch (contentType) {
            case "travel":
              sectionTitle = contentSlug
                ? `${contentSlug.replace(/-/g, " ")} Travel`
                : "Travel";
              searchQuery = contentSlug ? `${contentSlug} travel` : "travel";
              sectionDescription = `Travel ${
                contentSlug ? contentSlug.replace(/-/g, " ") + " " : ""
              }advice, tips, and stories.`;
              break;
          }
          if (searchQuery) {
            console.log(`Fetching posts with search query: ${searchQuery}`);
            const fetchedPosts = await getPosts({
              search: searchQuery,
              perPage: 10,
            });
            if (fetchedPosts && fetchedPosts.length > 0) {
              // Transform posts to ensure proper image handling
              const transformedPosts = fetchedPosts.map(transformPost).filter(Boolean);
              setPageTitle(sectionTitle);
              setPageDescription(sectionDescription);
              setPageKeywords([
                contentType,
                searchQuery,
                "jeff honforloco",
                "blog",
              ]);
              setPosts(transformedPosts);
              setPageType("posts");
              setLoading(false);
              setHasFetched(true);
              return;
            }
          }
        }

        // If no content was found, set error state
        console.error(`Content not found for ${location.pathname}`);
        setError(`The requested content was not found.`);
        toast({
          title: "Content not found",
          description: `We couldn't find the content you requested.`,
          variant: "destructive",
        });
        setLoading(false);
        setHasFetched(true);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(
          "There was an error loading the content. Please try again later."
        );
        toast({
          title: "Error",
          description:
            "There was an error loading the content. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
        setHasFetched(true);
      }
    };

    fetchContent();
  }, [
    location.pathname,
    categoryParam,
    contentSlug,
    contentType,
    toast,
    navigate,
    pathKey,
  ]);

  // Redirect to 404 when error is set
  useEffect(() => {
    if (error && !loading && location.pathname !== "/404") {
      navigate("/404", { replace: true });
    }
  }, [error, loading, navigate, location.pathname]);

  // Structured data injection effect
  useEffect(() => {
    if (!loading && pageType && pageTitle) {
      let structuredData: any = null;
      if (pageType === "page" || pageType === "post") {
        structuredData = {
          "@context": "https://schema.org",
          "@type": pageType === "post" ? "BlogPosting" : "WebPage",
          name: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
        };
        if (pageType === "post") {
          structuredData.datePublished = content.date;
          structuredData.dateModified = content.modified || content.date;
          structuredData.headline = pageTitle;
          structuredData.author = {
            "@type": "Person",
            name: "Jeff HonForLoco",
          };
        }
      } else if (
        [
          "category",
          "posts",
          "story",
          "affiliate",
          "recommendation",
          "resource",
        ].includes(pageType)
      ) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://api.jeffhonforloco.com/post/${post.slug}`,
              name: post.title?.rendered || post.title,
            })),
          },
        };
      }
      if (structuredData) {
        const existingScript = document.getElementById(
          "dynamic-page-structured-data"
        );
        if (existingScript) {
          existingScript.remove();
        }
        const script = document.createElement("script");
        script.id = "dynamic-page-structured-data";
        script.type = "application/ld+json";
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
      return () => {
        const script = document.getElementById("dynamic-page-structured-data");
        if (script) {
          script.remove();
        }
      };
    }
  }, [
    loading,
    pageType,
    pageTitle,
    pageDescription,
    canonicalUrl,
    posts,
    content,
  ]);

  // Section view tracking effect
  useEffect(() => {
    try {
      if (typeof slug === "string") {
        const normalizedSlug = slug.replace(/\//g, "-");

        // Type guard to check if the normalizedSlug is one of the valid values
        if (
          ["affiliate", "stories", "recommendations", "resources"].includes(
            normalizedSlug as
              | "affiliate"
              | "stories"
              | "recommendations"
              | "resources"
          )
        ) {
          trackSectionView(
            normalizedSlug as
              | "affiliate"
              | "stories"
              | "recommendations"
              | "resources"
          );
        } else {
          console.log(`Section view: ${normalizedSlug}`);
        }
      }
    } catch (error) {
      console.error("Error tracking section view:", error);
    }
  }, [slug]);

  // Render Loading state
  if (loading) {
    return (
      <Layout>
        <SEO title="Loading..." />
        <div className="container max-w-7xl py-12 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Render 404 page if error state or pageType is 404
  if (pageType === "404" || error) {
    return (
      <Layout>
        <SEO title="404 - Content Not Found" />
        <div className="container max-w-4xl py-12 text-center">
          <h1 className="text-4xl font-bold mb-8">404 - Content Not Found</h1>
          <p className="text-lg mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
      </Layout>
    );
  }

  // Render specialized section view for story, affiliate, recommendation, resource with posts available
  if (
    ["story", "affiliate", "recommendation", "resource"].includes(
      pageType as string
    ) &&
    posts.length > 0
  ) {
    let sectionIcon = null;
    switch (pageType) {
      case "story":
        sectionIcon = "📖";
        break;
      case "affiliate":
        sectionIcon = "🔗";
        break;
      case "recommendation":
        sectionIcon = "👍";
        break;
      case "resource":
        sectionIcon = "🛠️";
        break;
    }
    return (
      <Layout>
        <SEO
          title={pageTitle}
          description={pageDescription}
          keywords={pageKeywords.join(", ")}
          canonical={canonicalUrl}
        />
        <div className="container max-w-7xl py-12">
          <div className="text-center mb-12">
            {sectionIcon && <div className="text-4xl mb-4">{sectionIcon}</div>}
            <h1 className="text-4xl font-bold mb-4">{pageTitle}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {pageDescription}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // Render a page view
  if (pageType === "page" && content) {
    const titleContent = content.title || {};
    const title =
      typeof titleContent === "string"
        ? titleContent
        : typeof titleContent.rendered === "string"
        ? titleContent.rendered
        : "";
    const contentBody = content.content || {};
    const contentHtml =
      typeof contentBody === "string"
        ? contentBody
        : typeof contentBody.rendered === "string"
        ? contentBody.rendered
        : "";
    return (
      <Layout>
        <SEO
          title={title}
          description={pageDescription}
          keywords={pageKeywords.join(", ")}
          canonical={canonicalUrl}
        />
        <div className="container max-w-4xl py-12">
          <h1
            className="text-4xl font-bold mb-8"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div
            className="prose prose-lg dark:prose-invert max-w-none article-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </Layout>
    );
  }

  // Render a single post view
  if (pageType === "post" && content) {
    const titleContent = content.title || {};
    const title =
      typeof titleContent === "string"
        ? titleContent
        : typeof titleContent.rendered === "string"
        ? titleContent.rendered
        : "";
    const contentBody = content.content || {};
    const contentHtml =
      typeof contentBody === "string"
        ? contentBody
        : typeof contentBody.rendered === "string"
        ? contentBody.rendered
        : "";
    const featuredMedia = content._embedded?.["wp:featuredmedia"]?.[0];
    const featuredImage = featuredMedia?.source_url || "/placeholder.svg";
    return (
      <Layout>
        <SEO
          title={title}
          description={pageDescription}
          keywords={pageKeywords.join(", ")}
          canonical={canonicalUrl}
          image={featuredImage}
          publishedAt={content.date}
          type="article"
        />
        <article className="pt-12 pb-16">
          <div className="container max-w-4xl mx-auto">
            <h1
              className="text-4xl font-bold mb-6"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {featuredImage && (
              <figure className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={featuredImage}
                  alt={title}
                  className="w-full h-auto"
                />
              </figure>
            )}
            <div
              className="prose prose-lg dark:prose-invert max-w-none article-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </article>
      </Layout>
    );
  }

  // Render a category view
  if (pageType === "category" && content) {
    return (
      <Layout>
        <SEO
          title={content.name}
          description={pageDescription}
          keywords={pageKeywords.join(", ")}
          canonical={canonicalUrl}
        />
        <div className="container max-w-7xl py-12">
          <h1 className="text-4xl font-bold mb-4">{content.name}</h1>
          {content.description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {content.description}
            </p>
          )}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl">No posts found in this category.</p>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // Render posts list view
  if (pageType === "posts" && posts.length > 0) {
    return (
      <Layout>
        <SEO
          title={pageTitle}
          description={pageDescription}
          keywords={pageKeywords.join(", ")}
          canonical={canonicalUrl}
        />
        <div className="container max-w-7xl py-12">
          <h1 className="text-4xl font-bold mb-8">{pageTitle}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // Fallback for unknown content
  return (
    <Layout>
      <div className="container max-w-4xl py-12 text-center">
        <h1 className="text-4xl font-bold mb-8">Content Not Found</h1>
        <p className="text-lg mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
    </Layout>
  );
};

export default DynamicWordPressPage;