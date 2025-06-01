import {Component, Input,} from '@angular/core';
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
}
