import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from './product.card/product.card.component';
// import {ProductService} from '../../core/services/product.service';
import {Product} from './product.model';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {ProductState} from '../../store/product/product.state';
import {ProductAction} from '../../store/product/product.actions';


@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product.list.component.html',
  imports: [CommonModule, ProductCardComponent]
})
export class ProductListComponent implements OnInit {
  // private productService = inject(ProductService);
  private store = inject(Store);
  products: Product[] = [];
  loading = true;
  skeletonItems = Array(5).fill(0); // Ajusta el número según tus cards

  product$: Observable<Product[]> = this.store.select(ProductState.getAllProducts);

  ngOnInit() {
    // this.productService.get().subscribe({
    //   next: data => {
    //     this.products = data;
    //     this.loading = false;
    //   },
    //   error: err => {
    //     console.error('Error al cargar productos:', err);
    //     this.loading = false;
    //   }
    // });
    this.store.dispatch(new ProductAction.Got());
    this.product$.subscribe(products => {
      this.products = [...products];
      this.loading = false;
    });
  }

  addProduct(product: Product) {
    if (product != null) {
      const item = this.products.find(value => value.id == product.id);
      if (item) {
        item.amount += 1;
      }
      console.log(this.products);
    }
  }

  substractProduct(product: Product) {
    if (product != null) {
      const item = this.products.find(value => value.id == product.id);
      if (item && item.amount > 0) {
        item.amount -= 1;
      }
      console.log(this.products);
    }
  }


}
