import {Injectable} from '@angular/core';
import {Product} from './product.model';
import {delay, Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductService {
  private products: Product[] = [
    {
      id: 0,
      name: 'Remolacha',
      description: '(Tienda local)',
      weight: '500 gm',
      price: 17.29,
      imageUrl: 'assets/product/beetroot.webp',
      amount: 0,
    },
    {
      id: 1,
      name: 'Zanahoria',
      description: '(Tienda local)',
      weight: '500 gm',
      price: 10.99,
      imageUrl: 'assets/product/carrot.webp',
      amount: 0,
    },
    {
      id: 2,
      name: 'Tomato',
      description: '(Tienda tercero)',
      weight: '500 gm',
      price: 6.99,
      imageUrl: 'assets/product/tomato.webp',
      amount: 0,
    },
    {
      id: 3,
      name: 'TV',
      description: '(Tienda local)',
      weight: '2 kg',
      price: 400,
      imageUrl: 'assets/product/tv.webp',
      amount: 0,
    },
    {
      id: 4,
      name: 'Lavadora',
      description: '(Tienda local)',
      weight: '10 kg',
      price: 800,
      imageUrl: '',
      amount: 0,
    }
  ];

  getProducts(): Observable<Product[] | []> {
    return of(this.products).pipe(delay(1000));
  }
}
