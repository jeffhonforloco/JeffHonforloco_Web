
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import ContentSyncStatus from '@/components/wordpress/ContentSyncStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import MediaManager from '@/components/wordpress/MediaManager';
import ContentPreview from '@/components/wordpress/ContentPreview';
import SelectiveSync from '@/components/wordpress/SelectiveSync';
import SeoWritingAI from '@/components/wordpress/SeoWritingAI';

const WordPressContent = () => {
  return (
    <Layout>
      <Helmet>
        <title>WordPress Content Management - Jeff HonForLoco</title>
        <meta name="description" content="Manage your WordPress content integration" />
      </Helmet>
      
      <div className="container max-w-7xl py-12">
        <h1 className="text-3xl font-bold mb-6">WordPress Content Management</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Manage and sync content from your WordPress site. Keep your content up to date with just a click.
        </p>
        
        <Separator className="my-6" />
        
        <Tabs defaultValue="sync" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="sync">Content Sync</TabsTrigger>
            <TabsTrigger value="preview">Content Preview</TabsTrigger>
            <TabsTrigger value="selective">Selective Sync</TabsTrigger>
            <TabsTrigger value="media">Media Library</TabsTrigger>
            <TabsTrigger value="seo-ai">SEO Writing AI</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sync" className="space-y-6">
            <ContentSyncStatus />
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-6">
            <ContentPreview />
          </TabsContent>
          
          <TabsContent value="selective" className="space-y-6">
            <SelectiveSync />
          </TabsContent>
          
          <TabsContent value="media" className="space-y-6">
            <MediaManager />
          </TabsContent>
          
          <TabsContent value="seo-ai" className="space-y-6">
            <SeoWritingAI />
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">WordPress API Settings</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your WordPress API integration is configured with the following settings:
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">API URL</span>
                  <code className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded text-sm mt-1">
                    https://www.jeffhonforloco.com/wp-json/wp/v2
                  </code>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Authentication</span>
                  <code className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded text-sm mt-1">
                    Basic Authentication (Username: developer)
                  </code>
                </div>
                
                <div className="flex flex-col mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">SEO Writing AI</span>
                  <code className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded text-sm mt-1">
                    Integration Active (www.seowriting.ai)
                  </code>
                </div>
                
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  <p>These settings are configured in your application code. To modify them, please update the WordPress API configuration in your codebase.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default WordPressContent;
