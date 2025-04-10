
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getMedia } from '@/lib/wordpress';
import { Pagination } from '@/components/ui/pagination';
import { PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define the Media type here to avoid conflicts with imported types
interface MediaItem {
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

const MediaManager = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const { media, totalPages: pages } = await getMedia(currentPage, 12);
        setMediaItems(media as unknown as MediaItem[]);
        setFilteredItems(media as unknown as MediaItem[]);
        setTotalPages(pages);
      } catch (error) {
        console.error('Error fetching media:', error);
        toast({
          title: "Error",
          description: "Failed to load media from WordPress.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [currentPage, toast]);

  useEffect(() => {
    // Filter items based on search term and selected type
    let filtered = [...mediaItems];
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }
    
    setFilteredItems(filtered);
  }, [searchTerm, selectedType, mediaItems]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getFileType = (item: MediaItem) => {
    if (item.type === 'image') return 'Image';
    if (item.type === 'video') return 'Video';
    if (item.type === 'audio') return 'Audio';
    if (item.type === 'application') return 'Document';
    return 'File';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>WordPress Media Library</CardTitle>
        <CardDescription>
          Browse and manage media from your WordPress site. Changes made in WordPress will be reflected here after syncing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Search media..."
              className="w-full px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-md bg-white dark:bg-gray-800"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="application">Documents</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="border rounded-md overflow-hidden bg-white dark:bg-gray-800">
                  <div className="h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {item.type === 'image' ? (
                      <img
                        src={item.source_url}
                        alt={item.alt_text || item.title.rendered}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <ImageIcon className="h-12 w-12" />
                        <span className="text-sm mt-2">{getFileType(item)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium truncate" title={item.title.rendered}>
                      {item.title.rendered}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNum)}
                        isActive={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No media items found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaManager;
