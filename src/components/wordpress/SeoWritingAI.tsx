
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, Save, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SeoWritingAI = () => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [contentType, setContentType] = useState('blog-post');
  const [tone, setTone] = useState('informative');
  const [wordCount, setWordCount] = useState('500');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!title || !topic) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a title and topic.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setGeneratedContent('');

    try {
      // Simulate API call to SEO Writing AI
      // In a real implementation, you would make an actual API call to www.seowriting.ai
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sample generated content
      const sampleContent = `
# ${title}

## Introduction
This is an AI-generated article about ${topic}. The content is optimized for SEO with a focus on the following keywords: ${keywords || topic}.

## Main Content
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis libero in vestibulum scelerisque. Phasellus rhoncus erat sit amet metus hendrerit, nec condimentum odio pellentesque. Vestibulum mattis est ut massa sodales egestas. Proin maximus facilisis libero, in placerat risus sollicitudin id.

## Benefits of ${topic}
1. Improved understanding of the subject
2. Better SEO rankings for your website
3. Engaging content for your readers
4. Professional quality writing with minimal effort

## Conclusion
In conclusion, ${topic} is an important area to explore and understand. By leveraging the power of AI content generation, you can create high-quality, SEO-optimized content quickly and efficiently.

*This content was generated using SEO Writing AI integration. You can edit it further before publishing to your WordPress site.*
      `;
      
      setGeneratedContent(sampleContent);
      
      toast({
        title: "Content Generated",
        description: "AI-generated content is ready for review and publishing.",
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast({
      title: "Copied",
      description: "Content copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToWordPress = () => {
    toast({
      title: "Content Saved",
      description: "The generated content will be saved as a draft in WordPress.",
    });
    // In a real implementation, you would make an API call to save to WordPress
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SEO Writing AI</CardTitle>
        <CardDescription>
          Generate SEO-optimized content using AI and publish directly to your WordPress site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="generate">Generate Content</TabsTrigger>
            <TabsTrigger value="history">Content History</TabsTrigger>
            <TabsTrigger value="settings">API Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Post Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter a title for your content" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="topic">Main Topic</Label>
                <Input 
                  id="topic" 
                  placeholder="What is your content about?" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="keywords">SEO Keywords (comma separated)</Label>
                <Input 
                  id="keywords" 
                  placeholder="keyword1, keyword2, keyword3" 
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger id="content-type">
                      <SelectValue placeholder="Content Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog-post">Blog Post</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="product-description">Product Description</SelectItem>
                      <SelectItem value="landing-page">Landing Page</SelectItem>
                      <SelectItem value="social-media">Social Media Post</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="tone">Tone of Voice</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informative">Informative</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="word-count">Word Count</Label>
                  <Select value={wordCount} onValueChange={setWordCount}>
                    <SelectTrigger id="word-count">
                      <SelectValue placeholder="Word Count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">~300 words</SelectItem>
                      <SelectItem value="500">~500 words</SelectItem>
                      <SelectItem value="800">~800 words</SelectItem>
                      <SelectItem value="1200">~1200 words</SelectItem>
                      <SelectItem value="2000">~2000 words</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                disabled={loading} 
                onClick={handleGenerate} 
                className="w-full mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>
            
            {generatedContent && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Generated Content</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={handleCopy}>
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button size="sm" onClick={handleSaveToWordPress}>
                      <Save className="mr-2 h-4 w-4" />
                      Save to WordPress
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md">
                  <Textarea
                    className="min-h-[400px] font-mono text-sm"
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                  />
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="text-center py-12">
              <p className="text-gray-500">Your generated content history will appear here.</p>
              <p className="text-gray-400 text-sm mt-2">You haven't generated any content yet.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="api-key">SEO Writing AI API Key</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  placeholder="Enter your API key" 
                />
                <p className="text-sm text-gray-500">
                  You can get your API key from <a href="https://www.seowriting.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">www.seowriting.ai</a>
                </p>
              </div>
              
              <Button className="w-full">
                Save API Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SeoWritingAI;
