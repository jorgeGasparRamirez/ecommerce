export interface Product {
  id: number;
  name: string;
  description?: string;
  weight: string;
  price: number;
  imageUrl: string;
  thumbnailsUrl?: string[];
  available: number;
}
