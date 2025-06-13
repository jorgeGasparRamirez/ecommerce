import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { ShoppingCarState, ShoppingCarStateModel } from './shopping-car.state';
import { ShoppingCarAction } from './shopping-car.actions';

describe('ShoppingCar store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([ShoppingCarState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: ShoppingCarStateModel = {
      items: ['item-1']
    };
    store.dispatch(new ShoppingCarAction('item-1'));
    const actual = store.selectSnapshot(ShoppingCarState.getState);
    expect(actual).toEqual(expected);
  });

});
