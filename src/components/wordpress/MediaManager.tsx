
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getMedia } from '@/lib/wordpress';
import { Loader2, Search, Image, FileText, Film, Music, File, X } from 'lucide-react';

interface Media {
  id: number;
  title: { rendered: string };
  source_url: string;
  mime_type: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, { source_url: string }>;
  };
  date: string;
  alt_text?: string;
}

const MediaManager = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch media items
  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const response = await getMedia(currentPage, 20);
        setMedia(response.media);
        setFilteredMedia(response.media);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [currentPage]);

  // Filter media based on search term and media type
  useEffect(() => {
    let filtered = media;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by media type
    if (mediaType !== 'all') {
      filtered = filtered.filter(item => item.mime_type.startsWith(mediaType));
    }
    
    setFilteredMedia(filtered);
  }, [searchTerm, mediaType, media]);

  // Handle media selection
  const handleSelectMedia = (item: Media) => {
    setSelectedMedia(item);
    setIsModalOpen(true);
  };

  // Get appropriate icon for media type
  const getMediaIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-5 w-5" />;
    if (mimeType.startsWith('video/')) return <Film className="h-5 w-5" />;
    if (mimeType.startsWith('audio/')) return <Music className="h-5 w-5" />;
    if (mimeType.startsWith('text/')) return <FileText className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
  };

  // Get formatted date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
          <CardDescription>
            Browse and manage media items from your WordPress site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search media..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={mediaType} onValueChange={setMediaType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Media</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="application">Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center h-60">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredMedia.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredMedia.map((item) => (
                  <div 
                    key={item.id} 
                    className="border rounded-lg overflow-hidden hover:border-primary cursor-pointer transition-colors"
                    onClick={() => handleSelectMedia(item)}
                  >
                    <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                      {item.mime_type.startsWith('image/') ? (
                        <img 
                          src={item.source_url} 
                          alt={item.title.rendered} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-4">
                          {getMediaIcon(item.mime_type)}
                          <span className="text-xs mt-2 text-center text-gray-500 truncate max-w-full">
                            {item.mime_type.split('/')[1].toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <h3 className="text-sm font-medium truncate" title={item.title.rendered}>
                        {item.title.rendered}
                      </h3>
                      <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-60 text-gray-500">
                <File className="h-10 w-10 mb-2 opacity-50" />
                <p>No media items found</p>
                {(searchTerm || mediaType !== 'all') && (
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchTerm('');
                      setMediaType('all');
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Media Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Media Details</DialogTitle>
            <DialogDescription>
              View and manage media item information
            </DialogDescription>
          </DialogHeader>
          
          {selectedMedia && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 flex items-center justify-center">
                {selectedMedia.mime_type.startsWith('image/') ? (
                  <img 
                    src={selectedMedia.source_url} 
                    alt={selectedMedia.title.rendered} 
                    className="max-w-full max-h-[300px] object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8">
                    {getMediaIcon(selectedMedia.mime_type)}
                    <span className="text-lg mt-4">{selectedMedia.mime_type}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">
                    {selectedMedia.title.rendered}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Uploaded on {formatDate(selectedMedia.date)}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">URL:</span>
                    <span className="text-sm text-gray-500 truncate max-w-[250px]">
                      {selectedMedia.source_url}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Type:</span>
                    <span className="text-sm text-gray-500">
                      {selectedMedia.mime_type}
                    </span>
                  </div>
                  
                  {selectedMedia.media_details?.width && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Dimensions:</span>
                      <span className="text-sm text-gray-500">
                        {selectedMedia.media_details.width} × {selectedMedia.media_details.height} pixels
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Alt Text:</span>
                    <span className="text-sm text-gray-500">
                      {selectedMedia.alt_text || 'None'}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedMedia.source_url);
                      navigator.clipboard.writeText(selectedMedia.source_url).then(() => {
                        alert('URL copied to clipboard!');
                      });
                    }}
                  >
                    Copy Media URL
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaManager;
