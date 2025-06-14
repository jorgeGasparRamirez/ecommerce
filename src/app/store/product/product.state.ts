import {inject, Injectable} from '@angular/core';
import {State, Action, Selector, StateContext} from '@ngxs/store';
import {AddProduct, GotProduct} from './product.actions';
import {Product} from '../../pages/product/product.model';
import {ProductService} from '../../core/services/product.service';
import {tap} from 'rxjs';

export interface ProductStateModel {
  products: Product[];
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: []
  }
})
@Injectable()
export class ProductState {

  productService = inject(ProductService);

  @Selector()
  static getState(state: ProductStateModel) {
    return state;
  }

  @Selector()
  static getAllProducts(state: ProductStateModel) {
    return state.products;
  }

  @Selector()
  static emptyProducts(state: ProductStateModel) {
    return state.products.length === 0;
  }

  @Selector()
  static getProductById(state: ProductStateModel) {
    return (id: number) => state.products.find(i => i.id === id);
  }

  @Action(AddProduct)
  add(ctx: StateContext<ProductStateModel>, {payload}: AddProduct) {
    const stateModel = ctx.getState();
    stateModel.products = [...stateModel.products, payload];
    ctx.setState(stateModel);
  }

  @Action(GotProduct)
  got(ctx: StateContext<ProductStateModel>) {
    return this.productService.get().pipe(tap(products => {
      console.log('got products', JSON.stringify(products));
      ctx.patchState({products: products});
    }));
  }
}
