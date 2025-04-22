import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ShopHeader from '@/components/shop/ShopHeader';
import ProductGrid from '@/components/shop/ProductGrid';
import ProductFilters from '@/components/shop/ProductFilters';
import { Product, Category } from '@/types/shop';
import { products, categories } from '@/data/shopData';

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('featured');
  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get('product');
    
    if (productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
        setFilteredProducts([product]);
        setActiveCategory(product.categoryId);
      } else {
        setFilteredProducts(products);
        setActiveCategory('all');
      }
    } else {
      handleCategoryChange(activeCategory);
    }
  }, [location.search]);
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    if (categoryId === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.categoryId === categoryId));
    }
  };
  
  const handleSortChange = (option: string) => {
    setSortOption(option);
    let sortedProducts = [...filteredProducts];
    
    switch (option) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'featured':
      default:
        sortedProducts = activeCategory === 'all' 
          ? products 
          : products.filter(product => product.categoryId === activeCategory);
        break;
    }
    
    setFilteredProducts(sortedProducts);
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Shop | Jeff HonForLoco</title>
        <meta name="description" content="Browse our selection of recommended products for lifestyle improvement, travel essentials, and more." />
      </Helmet>
      
      <div className="container-lg py-8 md:py-12">
        <ShopHeader />
        
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <aside className="w-full md:w-64 shrink-0">
            <ProductFilters 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          </aside>
          
          <div className="flex-1">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
