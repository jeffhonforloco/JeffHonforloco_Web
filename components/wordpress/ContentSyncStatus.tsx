
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { syncAllContent } from '@/lib/wordpress';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SyncStatus {
  postsCount: number;
  pagesCount: number;
  categoriesCount: number;
  tagsCount: number;
  mediaCount: number;
  success: boolean;
  inProgress: boolean;
  lastSynced: string | null;
}

const ContentSyncStatus = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    postsCount: 0,
    pagesCount: 0,
    categoriesCount: 0,
    tagsCount: 0,
    mediaCount: 0,
    success: false,
    inProgress: false,
    lastSynced: null
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have stored sync data
    const storedSyncData = localStorage.getItem('wordpressSyncStatus');
    if (storedSyncData) {
      setSyncStatus(JSON.parse(storedSyncData));
    }
  }, []);

  const handleSync = async () => {
    try {
      setSyncStatus(current => ({ ...current, inProgress: true }));
      
      toast({
        title: "WordPress Sync Started",
        description: "Starting to sync content from WordPress. This might take a minute...",
      });
      
      const result = await syncAllContent();
      
      const newStatus = {
        ...result,
        inProgress: false,
        lastSynced: new Date().toISOString()
      };
      
      setSyncStatus(newStatus);
      localStorage.setItem('wordpressSyncStatus', JSON.stringify(newStatus));
      
      toast({
        title: result.success ? "WordPress Sync Complete" : "WordPress Sync Failed",
        description: result.success 
          ? `Successfully synced ${result.postsCount} posts, ${result.pagesCount} pages, ${result.categoriesCount} categories, ${result.tagsCount} tags, and ${result.mediaCount} media items.`
          : "There was an error syncing content from WordPress.",
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error('Error during sync:', error);
      setSyncStatus(current => ({ 
        ...current, 
        inProgress: false,
        success: false
      }));
      
      toast({
        title: "WordPress Sync Failed",
        description: "An error occurred while syncing content from WordPress.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>WordPress Content Sync</CardTitle>
        <CardDescription>
          Sync all content from your WordPress site to keep your content up to date.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="border rounded-lg p-3 text-center">
              <p className="text-xl font-bold">{syncStatus.postsCount}</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <p className="text-xl font-bold">{syncStatus.pagesCount}</p>
              <p className="text-sm text-gray-500">Pages</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <p className="text-xl font-bold">{syncStatus.categoriesCount}</p>
              <p className="text-sm text-gray-500">Categories</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <p className="text-xl font-bold">{syncStatus.tagsCount}</p>
              <p className="text-sm text-gray-500">Tags</p>
            </div>
            <div className="border rounded-lg p-3 text-center sm:col-span-2">
              <p className="text-xl font-bold">{syncStatus.mediaCount}</p>
              <p className="text-sm text-gray-500">Media Items</p>
            </div>
          </div>
          
          {syncStatus.lastSynced && (
            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-sm text-gray-500">Last synced:</p>
                <p className="text-sm font-medium">
                  {new Date(syncStatus.lastSynced).toLocaleString()}
                </p>
              </div>
              <div>
                {syncStatus.success ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-1" />
                    <span>Success</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <XCircle className="w-5 h-5 mr-1" />
                    <span>Failed</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSync} 
          className="w-full" 
          disabled={syncStatus.inProgress}
        >
          {syncStatus.inProgress && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {syncStatus.inProgress ? 'Syncing...' : 'Sync All WordPress Content'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentSyncStatus;
