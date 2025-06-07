import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { ProductState, ProductStateModel } from './product.state';
import { ProductAction } from './product.actions';

describe('Product store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([ProductState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: ProductStateModel = {
      items: ['item-1']
    };
    store.dispatch(new ProductAction('item-1'));
    const actual = store.selectSnapshot(ProductState.getState);
    expect(actual).toEqual(expected);
  });

});
