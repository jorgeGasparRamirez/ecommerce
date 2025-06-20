import {Component, effect, inject, signal, Signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from '../product-card/product.card.component';
import {Product} from './product.model';
import {Store} from '@ngxs/store';
import {ProductState} from '../../../store/product/product.state';
import {GotProduct} from '../../../store/product/product.actions';
import {AddCartItem, DeleteCartItem} from '../../../store/shopping-cart/shopping-car.actions';

import {toSignal} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product.list.component.html',
  imports: [CommonModule, ProductCardComponent]
})
export class ProductListComponent {
  // private productService = inject(ProductService);
  private store = inject(Store);
  // products: Product[] = [];
  // loading = false;
  skeletonItems = Array(5).fill(0); // Ajusta el número según tus cards

  // product$: Observable<Product[]> = this.store.select(ProductState.getAllProducts);
  products: Signal<Product[]> = toSignal(this.store.select(ProductState.getAllProducts), {initialValue: []});
  loading: WritableSignal<boolean> = signal(true);

  // ngOnInit() {
  //   // this.productService.get().subscribe({
  //   //   next: data => {
  //   //     this.products = data;
  //   //     this.loading = false;
  //   //   },
  //   //   error: err => {
  //   //     console.error('Error al cargar productos:', err);
  //   //     this.loading = false;
  //   //   }
  //   // });
  //   this.store.dispatch(new Got());
  //   // this.product$.subscribe(products => {
  //   //   this.products = [...products];
  //   //   this.loading = false;
  //   // });
  // }

  constructor() {
    this.store.dispatch(new GotProduct());
    effect(() => {
      if (this.loading() && this.products().length > 0) {
        this.loading.set(false);
      }
    });
  }

  addProduct(product: Product) {
    console.log('DDDDDDDDDDWWWWWWWWWEEEEEEEEEEE');
    if (product != null) {
      // const quantity = this.store.selectSnapshot(ShoppingCarState.getState).items.find(value => value.productId === product.id)?.quantity;
      // console.log('Cantidad' + quantity);
      // const cartItem: CartItem = {productId: product.id, quantity: quantity! + 1, priceSnapshot: product.price};
      console.log(`$cartItem Cart Item`);
      this.store.dispatch(new AddCartItem(product))

    }
  }

  substractProduct(product: Product) {
    if (product != null) {
      // const item = this.products.find(value => value.id == product.id);
      // if (item && item.available > 0) {
      //   item.available -= 1;
      // }
      this.store.dispatch(new DeleteCartItem(product.id));
    }
  }


}
