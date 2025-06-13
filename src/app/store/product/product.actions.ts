import {Product} from '../../pages/product/product.model';

export class AddProduct {
  static readonly type = '[Product] Add item';

  constructor(readonly payload: Product) {
  }
}

export class GotProduct {
  static readonly type = '[Product] Got';
}


export class UpdateProduct {
  static readonly type = '[Product] Update item';

  constructor(readonly payload: { id: string, product: Product }) {
  }
}

export class DeleteProduct {
  static readonly type = '[Product] Delete item';

  constructor(readonly id: string) {
  }
}
