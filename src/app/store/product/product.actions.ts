import {Product} from '../../pages/product/product.model';

export namespace ProductAction {
  export class Add {
    static readonly type = '[Product] Add item';

    constructor(readonly payload: Product) {
    }
  }

  export class Got {
    static readonly type = '[Product] Got';
  }


  export class Update {
    static readonly type = '[Product] Update item';

    constructor(readonly payload: { id: string, product: Product }) {
    }
  }

  export class Delete {
    static readonly type = '[Product] Delete item';

    constructor(readonly id: string) {
    }
  }
}
