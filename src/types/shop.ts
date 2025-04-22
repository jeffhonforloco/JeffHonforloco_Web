
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  url: string;
  badge?: string;
  categoryId: string;
  categoryName: string;
  date: string;
  featured?: boolean;
  type: 'affiliate' | 'digital' | 'physical';
  downloadUrl?: string;
  fileType?: string;
  fileSize?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: 'affiliate' | 'digital' | 'physical';
  downloadUrl?: string;
}
