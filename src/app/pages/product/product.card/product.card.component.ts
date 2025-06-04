import {Component, EventEmitter, Input, Output,} from '@angular/core';
import {Product} from '../product.model';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './product.card.component.html',
  styleUrl: './product.card.component.css'
})
export class ProductCardComponent {
  @Input({required: true}) product: Product | undefined;
  @Output() subtractProduct: EventEmitter<Product> = new EventEmitter();
  @Output() addProduct = new EventEmitter<Product>();

  onAddProduct() {
    this.addProduct.emit(this.product);
  }

  onSubstractProduct() {
    this.subtractProduct.emit(this.product);
  }
}
