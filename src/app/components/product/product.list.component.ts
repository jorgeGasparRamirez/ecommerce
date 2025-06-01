import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from './product.card/product.card.component';
import {ProductService} from './product.service';
import {Product} from './product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product.list.component.html',
  imports: [CommonModule, ProductCardComponent]
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  products: Product[] | [] = [];
  loading = true;

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error al cargar productos:', err);
        this.loading = false;
      }
    });
  }


}
