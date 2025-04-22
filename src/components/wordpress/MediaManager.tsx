
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getMedia } from '@/lib/wordpress';
import { Pagination } from '@/components/ui/pagination';
import { PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Loader2, Image as ImageIcon, File, Video, Music, Download, Search, Filter, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { toast } = useToast();

  // Media fetch function
  const fetchMedia = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const { media, totalPages: pages } = await getMedia(page, 12);
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
  }, [toast]);

  // Initial load
  useEffect(() => {
    fetchMedia(currentPage);
  }, [currentPage, fetchMedia]);

  // Filter items when search or type changes
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

  // Page change handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
  };

  // Refresh media
  const handleRefresh = () => {
    fetchMedia(currentPage);
    toast({
      title: "Refreshed",
      description: "Media library has been refreshed",
    });
  };

  // Get icon for file type
  const getFileIcon = (item: MediaItem) => {
    if (item.type === 'image') return <ImageIcon className="h-8 w-8 text-blue-500" />;
    if (item.type === 'video') return <Video className="h-8 w-8 text-purple-500" />;
    if (item.type === 'audio') return <Music className="h-8 w-8 text-green-500" />;
    return <File className="h-8 w-8 text-gray-500" />;
  };

  // Get readable file type
  const getFileType = (item: MediaItem) => {
    if (item.type === 'image') return 'Image';
    if (item.type === 'video') return 'Video';
    if (item.type === 'audio') return 'Audio';
    if (item.type === 'application') return 'Document';
    return 'File';
  };

  // Format file size for display
  const formatFileSize = (fileSizeInBytes?: number) => {
    if (!fileSizeInBytes) return 'Unknown size';
    
    const kiloByte = 1024;
    const megaByte = kiloByte * 1024;
    
    if (fileSizeInBytes < kiloByte) {
      return `${fileSizeInBytes} B`;
    } else if (fileSizeInBytes < megaByte) {
      return `${(fileSizeInBytes / kiloByte).toFixed(1)} KB`;
    } else {
      return `${(fileSizeInBytes / megaByte).toFixed(1)} MB`;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">WordPress Media Library</CardTitle>
            <CardDescription className="mt-1">
              Browse and manage media from your WordPress site
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search media..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex gap-2 items-center">
              <Filter className="text-gray-400 h-4 w-4" />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="application">Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {(searchTerm || selectedType !== 'all') && (
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="outline" className="px-2 py-1 text-xs flex items-center gap-1">
                    Search: {searchTerm}
                    <button onClick={() => setSearchTerm('')}><X className="h-3 w-3" /></button>
                  </Badge>
                )}
                {selectedType !== 'all' && (
                  <Badge variant="outline" className="px-2 py-1 text-xs flex items-center gap-1">
                    Type: {selectedType}
                    <button onClick={() => setSelectedType('all')}><X className="h-3 w-3" /></button>
                  </Badge>
                )}
                <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={handleClearFilters}>
                  Clear all
                </Button>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-gray-500 text-sm">Loading media...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="border rounded-md overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 group"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center relative">
                    {item.type === 'image' ? (
                      <>
                        <img
                          src={item.source_url}
                          alt={item.alt_text || item.title.rendered}
                          className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-90"
                        />
                        {hoveredItem === item.id && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button size="sm" variant="secondary" className="text-xs flex gap-1">
                              <Download className="h-3 w-3" />
                              Download
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        {getFileIcon(item)}
                        <span className="text-sm mt-2">{getFileType(item)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 border-t">
                    <h3 className="text-sm font-medium truncate" title={item.title.rendered}>
                      {item.title.rendered}
                    </h3>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                      {item.media_details?.file && (
                        <p className="text-xs text-gray-500">
                          {item.media_details.file.split('.').pop()?.toUpperCase()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                Showing {filteredItems.length} of {mediaItems.length} items
              </span>
              
              <Pagination>
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
            </div>
          </>
        ) : (
          <div className="text-center py-12 space-y-2">
            <div className="flex justify-center">
              <ImageIcon className="h-12 w-12 text-gray-300" />
            </div>
            <p className="text-gray-500">No media items found.</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
            {(searchTerm || selectedType !== 'all') && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                Clear filters
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaManager;
