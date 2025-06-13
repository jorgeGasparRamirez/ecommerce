import {Product} from '../../pages/product/product.model';

export class AddCartItem {
  static readonly type = '[ShoppingCar] Add item';

  constructor(readonly payload: Product) {
  }
}

export class UpdateCartItem {
  static readonly type = '[ShoppingCar] Update item';

  constructor(readonly productId: number, readonly quantity: number) {
  }
}

export class DeleteCartItem {
  static readonly type = '[ShoppingCar] Delete';

  constructor(readonly id: number) {
  }
}


