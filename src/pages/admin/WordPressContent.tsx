
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import ContentSyncStatus from '@/components/wordpress/ContentSyncStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import MediaManager from '@/components/wordpress/MediaManager';
import ContentPreview from '@/components/wordpress/ContentPreview';
import SelectiveSync from '@/components/wordpress/SelectiveSync';
import SeoWritingAI from '@/components/wordpress/SeoWritingAI';
import { AlertCircle, Info, Check, Settings, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const WordPressContent = () => {
  const [activeTab, setActiveTab] = useState('sync');
  const { toast } = useToast();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: "Tab changed",
      description: `You're now viewing the ${value.charAt(0).toUpperCase() + value.slice(1)} tab`,
      duration: 2000,
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>WordPress Content Management - Jeff HonForLoco</title>
        <meta name="description" content="Manage your WordPress content integration with advanced synchronization, preview, and SEO tools." />
      </Helmet>
      
      <div className="container max-w-7xl py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="article-title mb-2">WordPress Content Management</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Manage and sync content from your WordPress site. Keep your content up to date with advanced tools and SEO integration.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
              API Connected
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">
              SEO Integrated
            </Badge>
          </div>
        </div>
        
        <Alert className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-300">Integration Status</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400">
            Your WordPress content is being synchronized with SEO Writing AI integration enabled.
          </AlertDescription>
        </Alert>
        
        <Separator className="my-6" />
        
        <Tabs defaultValue="sync" className="w-full" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full flex flex-wrap justify-start overflow-x-auto">
            <TabsTrigger value="sync" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              <Check className="h-4 w-4 mr-2" />
              Content Sync
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Content Preview
            </TabsTrigger>
            <TabsTrigger value="selective" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Selective Sync
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Media Library
            </TabsTrigger>
            <TabsTrigger value="seo-ai" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              <Zap className="h-4 w-4 mr-2 text-amber-500" />
              SEO Writing AI
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sync" className="space-y-6 animate-fade-in">
            <ContentSyncStatus />
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-6 animate-fade-in">
            <ContentPreview />
          </TabsContent>
          
          <TabsContent value="selective" className="space-y-6 animate-fade-in">
            <SelectiveSync />
          </TabsContent>
          
          <TabsContent value="media" className="space-y-6 animate-fade-in">
            <MediaManager />
          </TabsContent>
          
          <TabsContent value="seo-ai" className="space-y-6 animate-fade-in">
            <SeoWritingAI />
          </TabsContent>
          
          <TabsContent value="settings" className="animate-fade-in">
            <Card className="max-w-3xl mx-auto">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">WordPress API Settings</CardTitle>
                <CardDescription>
                  Your WordPress API integration settings and configuration details
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">API URL</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded text-sm font-mono border border-gray-200 dark:border-gray-700">
                      https://api.jeffhonforloco.com/wp-json/wp/v2
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Authentication</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded text-sm font-mono border border-gray-200 dark:border-gray-700">
                      Basic Authentication (Username: developer)
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">SEO Writing AI</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded text-sm font-mono border border-gray-200 dark:border-gray-700 flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Integration Active (www.seowriting.ai)
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sync Frequency</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded text-sm font-mono border border-gray-200 dark:border-gray-700">
                      Every 6 hours (Automatic)
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Custom Post Types Enabled</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Posts</Badge>
                    <Badge variant="secondary">Pages</Badge>
                    <Badge variant="secondary">Products</Badge>
                    <Badge variant="secondary">Testimonials</Badge>
                    <Badge variant="secondary">Case Studies</Badge>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last synced: April 11, 2025 at 9:45 AM
                </p>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Configuration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default WordPressContent;
