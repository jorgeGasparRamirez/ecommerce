import {Injectable} from '@angular/core';
import {Product} from '../../pages/product/product.model';
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
      available: 5,
    },
    {
      id: 1,
      name: 'Zanahoria',
      description: '(Tienda local)',
      weight: '500 gm',
      price: 10.99,
      imageUrl: 'assets/product/carrot.webp',
      available: 4,
    },
    {
      id: 2,
      name: 'Tomato',
      description: '(Tienda tercero)',
      weight: '500 gm',
      price: 6.99,
      imageUrl: 'assets/product/tomato.webp',
      available: 3,
    },
    {
      id: 3,
      name: 'TV',
      description: '(Tienda local)',
      weight: '2 kg',
      price: 400,
      imageUrl: 'assets/product/tv.webp',
      available: 2,
    },
    {
      id: 4,
      name: 'Lavadora',
      description: '(Tienda local)',
      weight: '10 kg',
      price: 800,
      imageUrl: '',
      available: 1,
    }
  ];

  add(product: Product) {
    return of({'status': 201, 'data': product}).pipe(delay(1000));
  }

  get(): Observable<Product[] | []> {
    return of(this.products).pipe(delay(1000));
  }
}
