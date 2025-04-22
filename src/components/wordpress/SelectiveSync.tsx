
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { 
  getPosts, 
  getAllPages, 
  getCategories, 
  getTags, 
  getMedia 
} from '@/lib/wordpress';

interface SyncItem {
  id: string;
  type: 'posts' | 'pages' | 'categories' | 'tags' | 'media';
  count: number;
  selected: boolean;
  syncing: boolean;
  success: boolean | null;
  lastSynced: string | null;
}

const SelectiveSync = () => {
  const { toast } = useToast();
  const [syncItems, setSyncItems] = useState<SyncItem[]>([
    { id: 'posts', type: 'posts', count: 0, selected: true, syncing: false, success: null, lastSynced: null },
    { id: 'pages', type: 'pages', count: 0, selected: true, syncing: false, success: null, lastSynced: null },
    { id: 'categories', type: 'categories', count: 0, selected: true, syncing: false, success: null, lastSynced: null },
    { id: 'tags', type: 'tags', count: 0, selected: true, syncing: false, success: null, lastSynced: null },
    { id: 'media', type: 'media', count: 0, selected: true, syncing: false, success: null, lastSynced: null },
  ]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [limitPosts, setLimitPosts] = useState(100);
  const [limitPages, setLimitPages] = useState(50);
  const [limitMedia, setLimitMedia] = useState(50);

  // Handle syncing for individual content types
  const syncContentType = async (itemId: string) => {
    const item = syncItems.find(i => i.id === itemId);
    if (!item) return;

    // Update item state to syncing
    setSyncItems(prev => prev.map(i => 
      i.id === itemId ? { ...i, syncing: true, success: null } : i
    ));

    try {
      let count = 0;
      
      // Execute the appropriate sync function based on content type
      if (item.type === 'posts') {
        const posts = await getPosts({ perPage: limitPosts });
        count = posts.length;
      } else if (item.type === 'pages') {
        const { pages } = await getAllPages(1, limitPages);
        count = pages.length;
      } else if (item.type === 'categories') {
        const categories = await getCategories();
        count = categories.length;
      } else if (item.type === 'tags') {
        const { tags } = await getTags();
        count = tags.length;
      } else if (item.type === 'media') {
        const { media } = await getMedia(1, limitMedia);
        count = media.length;
      }

      // Update success state
      setSyncItems(prev => prev.map(i => 
        i.id === itemId ? { 
          ...i, 
          syncing: false, 
          success: true, 
          count: count,
          lastSynced: new Date().toISOString() 
        } : i
      ));
      
      toast({
        title: `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Synced`,
        description: `Successfully synced ${count} ${item.type}`,
      });
      
    } catch (error) {
      console.error(`Error syncing ${item.type}:`, error);
      
      // Update error state
      setSyncItems(prev => prev.map(i => 
        i.id === itemId ? { ...i, syncing: false, success: false } : i
      ));
      
      toast({
        title: `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Sync Failed`,
        description: `There was an error syncing ${item.type} from WordPress.`,
        variant: "destructive",
      });
    }
  };

  // Handle selection change
  const handleSelectItem = (itemId: string, selected: boolean) => {
    setSyncItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, selected } : item
    ));
  };

  // Handle sync all selected
  const syncSelectedItems = async () => {
    const selectedItems = syncItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      toast({
        title: "No Content Types Selected",
        description: "Please select at least one content type to sync.",
        variant: "destructive",
      });
      return;
    }

    setIsSyncing(true);
    toast({
      title: "WordPress Sync Started",
      description: `Starting to sync ${selectedItems.length} content types from WordPress.`,
    });

    // Sync each selected item sequentially
    for (const item of selectedItems) {
      await syncContentType(item.id);
    }

    setIsSyncing(false);
    toast({
      title: "WordPress Sync Complete",
      description: "All selected content types have been synced.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Selective Content Sync</CardTitle>
        <CardDescription>
          Choose which content types to sync from your WordPress site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {syncItems.map((item) => (
              <div 
                key={item.id} 
                className={`border rounded-lg p-4 ${item.selected ? 'border-primary' : 'border-gray-300'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`select-${item.id}`}
                      checked={item.selected}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked === true)}
                      disabled={item.syncing || isSyncing}
                    />
                    <Label 
                      htmlFor={`select-${item.id}`}
                      className="text-base font-medium"
                    >
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Label>
                  </div>
                  {item.syncing ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : item.success === true ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : item.success === false ? (
                    <XCircle className="h-4 w-4 text-red-500" />
                  ) : null}
                </div>
                
                {(item.type === 'posts' || item.type === 'pages' || item.type === 'media') && (
                  <div className="mb-4">
                    <Label 
                      htmlFor={`limit-${item.id}`}
                      className="text-sm font-normal text-gray-500 mb-1 block"
                    >
                      Limit
                    </Label>
                    <Input 
                      id={`limit-${item.id}`}
                      type="number"
                      min="1"
                      max="1000"
                      value={
                        item.type === 'posts' ? limitPosts : 
                        item.type === 'pages' ? limitPages : 
                        limitMedia
                      }
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        if (item.type === 'posts') setLimitPosts(value);
                        else if (item.type === 'pages') setLimitPages(value);
                        else if (item.type === 'media') setLimitMedia(value);
                      }}
                      disabled={item.syncing || isSyncing}
                      className="max-w-[120px]"
                    />
                  </div>
                )}
                
                <div className="flex flex-col text-sm">
                  <span className="text-gray-500">Items synced:</span>
                  <span className="font-medium">{item.count}</span>
                </div>
                
                {item.lastSynced && (
                  <div className="mt-2 text-xs text-gray-500">
                    Last synced: {new Date(item.lastSynced).toLocaleString()}
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => syncContentType(item.id)}
                  disabled={item.syncing || isSyncing}
                >
                  {item.syncing && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                  Sync Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={syncSelectedItems} 
          className="w-full"
          disabled={isSyncing || syncItems.every(item => !item.selected)}
        >
          {isSyncing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSyncing ? 'Syncing Selected Content...' : 'Sync All Selected Content'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SelectiveSync;
