import {Component, computed, effect, EventEmitter, inject, Input, Output,} from '@angular/core';
import {Product} from '../product.model';
import {NgOptimizedImage} from '@angular/common';
import {Store} from '@ngxs/store';
import {ShoppingCarState} from '../../../store/shopping-cart/shopping-car.state';
// import {toSignal} from '@angular/core/rxjs-interop';
// import {map} from 'rxjs';
import {DoublePipe, NumberFragment} from '../../../core/common/pipes/double.pipe';

@Component({
  selector: 'app-product-card',
  imports: [
    NgOptimizedImage, DoublePipe
  ],
  templateUrl: './product.card.component.html',
  styleUrl: './product.card.component.css'
})
export class ProductCardComponent {
  @Input({required: true}) product: Product | undefined;
  @Output() subtractProduct: EventEmitter<Product> = new EventEmitter();
  @Output() addProduct = new EventEmitter<Product>();

  store = inject(Store);

  NumberFragment = NumberFragment;

  amountItemsInCart = this.store.selectSignal(ShoppingCarState.amountItemInCartById);
  amountItemsInCartById = computed(() => this.amountItemsInCart()(this.product!.id));

  onAddProduct() {
    this.addProduct.emit(this.product);
  }

  onSubstractProduct() {
    this.subtractProduct.emit(this.product);
  }
}
