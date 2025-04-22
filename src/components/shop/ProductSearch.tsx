
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Search } from 'lucide-react';
import { products } from '@/data/shopData';
import { cn } from '@/lib/utils';

interface ProductSearchProps {
  children?: React.ReactNode;
}

const ProductSearch = ({ children }: ProductSearchProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Handle selecting a product
  const handleSelect = (productId: string) => {
    setOpen(false);
    navigate(`/shop?product=${productId}`);
  };

  return (
    <>
      {children ? (
        <button 
          className="text-charcoal dark:text-white hover:text-gold transition-colors flex items-center gap-1" 
          onClick={() => setOpen(true)}
        >
          {children}
        </button>
      ) : (
        <button 
          className="text-charcoal dark:text-white hover:text-gold transition-colors flex items-center gap-1" 
          onClick={() => setOpen(true)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only md:not-sr-only md:inline">Search</span>
        </button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search products..." />
        <CommandList>
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup heading="Products">
            {products.map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => handleSelect(product.id)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{product.name}</span>
                  <span className="text-xs text-muted-foreground">${product.price.toFixed(2)} • {product.categoryName}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ProductSearch;
