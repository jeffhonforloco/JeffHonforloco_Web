
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPosts, getPageBySlug, getCategories, transformPost, transformPage } from '@/lib/wordpress';
import { Loader2 } from 'lucide-react';

const ContentPreview = () => {
  const [contentType, setContentType] = useState('posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewId, setPreviewId] = useState('');
  const [content, setContent] = useState<any[]>([]);
  const [previewContent, setPreviewContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Fetch content based on type
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        if (contentType === 'posts') {
          const posts = await getPosts({ search: searchTerm });
          setContent(posts);
        } else if (contentType === 'pages') {
          // For pages, we need a different approach since we can't easily search
          // This is simplified; in a real implementation, you might want to fetch all pages
          if (searchTerm) {
            const page = await getPageBySlug(searchTerm);
            setContent(page ? [page] : []);
          } else {
            setContent([]);
          }
        } else if (contentType === 'categories') {
          const categories = await getCategories();
          setContent(categories.filter(cat => 
            searchTerm ? cat.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
          ));
        }
      } catch (error) {
        console.error('Error fetching content for preview:', error);
      } finally {
        setLoading(false);
      }
    };

    if (contentType) {
      fetchContent();
    }
  }, [contentType, searchTerm]);

  // Fetch preview content
  const handlePreview = async (id: string) => {
    if (!id) return;
    
    setPreviewLoading(true);
    try {
      setPreviewId(id);
      if (contentType === 'posts') {
        const post = content.find(item => item.id.toString() === id);
        if (post) {
          const transformedPost = transformPost(post);
          setPreviewContent(transformedPost);
        }
      } else if (contentType === 'pages') {
        const page = content.find(item => item.id.toString() === id);
        if (page) {
          const transformedPage = transformPage(page);
          setPreviewContent(transformedPage);
        }
      } else if (contentType === 'categories') {
        const category = content.find(item => item.id.toString() === id);
        setPreviewContent(category);
      }
    } catch (error) {
      console.error('Error fetching preview content:', error);
    } finally {
      setPreviewLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>WordPress Content Preview</CardTitle>
        <CardDescription>
          Preview your WordPress content before syncing it to your website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Content</h3>
            
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="posts">Posts</SelectItem>
                <SelectItem value="pages">Pages</SelectItem>
                <SelectItem value="categories">Categories</SelectItem>
              </SelectContent>
            </Select>
            
            <Input 
              placeholder={`Search ${contentType}...`} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            
            <div className="h-[500px] overflow-y-auto border rounded p-2">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : content.length > 0 ? (
                <ul className="space-y-2">
                  {content.map((item) => (
                    <li key={item.id} className="border-b pb-2">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-left"
                        onClick={() => handlePreview(item.id.toString())}
                      >
                        {item.title?.rendered || item.name || `${contentType} #${item.id}`}
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  {searchTerm 
                    ? `No ${contentType} found matching "${searchTerm}"`
                    : `No ${contentType} available`}
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2 border rounded p-4">
            <h3 className="text-lg font-medium mb-4">Content Preview</h3>
            
            {previewLoading ? (
              <div className="flex items-center justify-center h-[500px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : previewContent ? (
              <div className="h-[500px] overflow-y-auto">
                <Tabs defaultValue="rendered" className="w-full">
                  <TabsList>
                    <TabsTrigger value="rendered">Rendered</TabsTrigger>
                    <TabsTrigger value="raw">Raw Data</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="rendered" className="mt-4">
                    {contentType === 'posts' || contentType === 'pages' ? (
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold">{previewContent.title}</h2>
                        {previewContent.featuredImage && (
                          <img 
                            src={previewContent.featuredImage} 
                            alt={previewContent.title} 
                            className="max-w-full h-auto rounded"
                          />
                        )}
                        <div dangerouslySetInnerHTML={{ __html: previewContent.content }} />
                      </div>
                    ) : contentType === 'categories' ? (
                      <div>
                        <h2 className="text-2xl font-bold">{previewContent.name}</h2>
                        <p className="text-gray-600 mt-2">Slug: {previewContent.slug}</p>
                        {previewContent.description && (
                          <div dangerouslySetInnerHTML={{ __html: previewContent.description }} className="mt-4" />
                        )}
                        <p className="mt-4">Posts in this category: {previewContent.count}</p>
                      </div>
                    ) : null}
                  </TabsContent>
                  
                  <TabsContent value="raw" className="mt-4">
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto">
                      {JSON.stringify(previewContent, null, 2)}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[500px] text-gray-500">
                Select content to preview
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentPreview;
