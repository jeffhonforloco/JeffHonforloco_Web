
import React from 'react';
import { Product } from '@/types/shop';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ExternalLink, Download, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useShopContext } from '@/context/ShopContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const { addToCart } = useShopContext();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleDownload = () => {
    if (product.downloadUrl) {
      // For direct downloads
      window.open(product.downloadUrl, '_blank');
      toast({
        title: "Download started",
        description: `Your download for ${product.name} has started.`,
      });
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-2 right-2 bg-gold text-white px-2 py-1 text-xs font-medium rounded">
            {product.badge}
          </span>
        )}
        
        {/* Product type badge */}
        <span className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs font-medium rounded flex items-center">
          <Tag className="h-3 w-3 mr-1" />
          {product.type === 'affiliate' ? 'Affiliate' : product.type === 'digital' ? 'Digital' : 'Physical'}
        </span>
      </div>
      
      <CardContent className="pt-6">
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">{product.categoryName}</span>
        </div>
        <h3 className="font-medium text-lg mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{product.description}</p>
        
        <div className="flex items-baseline justify-between">
          <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Show file details for digital products */}
        {product.type === 'digital' && product.fileType && (
          <div className="mt-2 text-xs text-muted-foreground">
            {product.fileType}{product.fileSize ? ` • ${product.fileSize}` : ''}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-0">
        {product.type === 'affiliate' ? (
          <>
            <Button
              variant="outline"
              className="flex-1"
              asChild
            >
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Product
              </a>
            </Button>
          </>
        ) : product.type === 'digital' ? (
          <>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            
            {product.downloadUrl && (
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleDownload}
                aria-label={`Download ${product.name}`}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              asChild
            >
              <a href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${product.name} on external site`}>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
