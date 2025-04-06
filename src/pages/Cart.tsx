
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useShopContext } from '@/context/ShopContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart, initiateDownload } = useShopContext();
  const { toast } = useToast();
  
  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    });
  };
  
  const handleCheckout = () => {
    toast({
      title: "Checkout process",
      description: "This would typically connect to a payment processor.",
    });
    // In a real app, this would redirect to checkout or process payment
  };
  
  const handleDownload = (id: string, name: string) => {
    initiateDownload(id);
    toast({
      title: "Download started",
      description: `Your download for ${name} has started.`,
    });
  };
  
  if (cartItems.length === 0) {
    return (
      <Layout>
        <Helmet>
          <title>Your Cart | Jeff HonForLoco</title>
        </Helmet>
        
        <div className="container-lg py-12 text-center">
          <div className="max-w-md mx-auto py-12">
            <div className="rounded-full bg-muted w-20 h-20 mx-auto flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="title-md mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Calculate number of digital and physical items
  const digitalItems = cartItems.filter(item => item.type === 'digital');
  const affiliateItems = cartItems.filter(item => item.type === 'affiliate');
  const physicalItems = cartItems.filter(item => item.type === 'physical');
  
  return (
    <Layout>
      <Helmet>
        <title>Your Cart | Jeff HonForLoco</title>
      </Helmet>
      
      <div className="container-lg py-8 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="title-md">Your Cart</h1>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-24 h-24 bg-muted">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardContent className="flex-1 p-4">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{item.name}</h3>
                          <Badge variant="outline" className="ml-2">
                            {item.type === 'digital' ? 'Digital' : item.type === 'affiliate' ? 'Affiliate' : 'Physical'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center mt-4 sm:mt-0">
                        {item.type !== 'affiliate' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                        
                        {item.type === 'digital' && item.downloadUrl && (
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 ml-2"
                            onClick={() => handleDownload(item.id, item.name)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {item.type === 'affiliate' && (
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 mr-2"
                            asChild
                          >
                            <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 ml-2 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
            
            <Button variant="outline" asChild className="mt-4">
              <Link to="/shop" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  {physicalItems.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                  )}
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  {digitalItems.length > 0 && (
                    <div className="text-sm text-muted-foreground mt-2">
                      Includes {digitalItems.length} digital {digitalItems.length === 1 ? 'item' : 'items'}
                    </div>
                  )}
                  
                  {affiliateItems.length > 0 && (
                    <div className="text-sm text-muted-foreground mt-2">
                      Includes {affiliateItems.length} affiliate {affiliateItems.length === 1 ? 'item' : 'items'}
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleCheckout}
                  disabled={cartItems.every(item => item.type === 'affiliate')}
                >
                  {cartItems.every(item => item.type === 'affiliate') 
                    ? 'Visit Affiliate Links' 
                    : 'Checkout'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
