
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Button
} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useShopContext } from '@/context/ShopContext';

interface CartButtonProps {
  mobile?: boolean;
}

const CartButton = ({ mobile = false }: CartButtonProps) => {
  const { cartCount } = useShopContext();
  
  if (mobile) {
    return (
      <Link to="/cart" className="relative mr-2">
        <ShoppingCart className="h-5 w-5 text-charcoal dark:text-white" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5 text-charcoal dark:text-white hover:text-gold transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-4">
        <div className="flex flex-col gap-4">
          {cartCount > 0 ? (
            <>
              <p className="text-sm text-muted-foreground">Your cart has {cartCount} items</p>
              <DropdownMenuItem asChild>
                <Link to="/cart" className="w-full justify-center">
                  <Button className="w-full">View Cart</Button>
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center">Your cart is empty</p>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartButton;
