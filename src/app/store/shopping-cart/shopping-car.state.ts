import {Injectable} from '@angular/core';
import {State, Action, Selector, StateContext} from '@ngxs/store';
import {AddCartItem, DeleteCartItem, UpdateCartItem} from './shopping-car.actions';

export interface CartItem {
  productId: number;
  quantity: number;
  priceSnapshot: number;
}

export interface ShoppingCarStateModel {
  items: CartItem[];
  total: number;
}

@State<ShoppingCarStateModel>({
  name: 'shoppingCar',
  defaults: {
    items: [],
    total: 0,
  }
})
@Injectable()
export class ShoppingCarState {

  @Selector()
  static getState(state: ShoppingCarStateModel) {
    return state;
  }

  @Selector([ShoppingCarState])
  static amountItemInCartById(state: ShoppingCarStateModel) {
    return (productId: number) => state.items.find(item => item.productId == productId)?.quantity ?? 0;
  }

  @Selector()
  static emptyCart(state: ShoppingCarStateModel) {
    return state.items.length === 0;
  }

  @Selector()
  static isProductInCart(state: ShoppingCarStateModel) {
    return (productId: number) => state.items.some(value => value.productId === productId);
  }

  @Action(AddCartItem)
  add(ctx: StateContext<ShoppingCarStateModel>, {payload}: AddCartItem) {
    const stateModel = ctx.getState();
    const existItem = stateModel.items.find(value => value.productId === payload.id);
    if (!existItem) {
      console.log(`Entro no existe el producto que Action Add`);
      ctx.patchState({
        items: [...stateModel.items, {
          productId: payload.id,
          quantity: 1,
          priceSnapshot: payload.price
        }],
        total: payload.price
      });
    } else {
      ctx.dispatch(new UpdateCartItem(existItem!.productId, existItem!.quantity + 1));
    }

  }

  @Action(UpdateCartItem)
  update(ctx: StateContext<ShoppingCarStateModel>, {productId, quantity}: UpdateCartItem) {
    const stateModel = ctx.getState();
    const itemIndex = stateModel.items.findIndex(value => value.productId === productId);
    if (itemIndex === -1) return;

    const itemToUpdate = stateModel.items[itemIndex];
    const quantityDifference = quantity - itemToUpdate.quantity;

    //Clonar el array para mantener la inmutabilidad
    const updatedItems = [...stateModel.items];
    updatedItems[itemIndex] = {...itemToUpdate, quantity: quantity};

    ctx.patchState({items: updatedItems, total: stateModel.total + (quantityDifference * itemToUpdate.priceSnapshot)});
  }

  @Action(DeleteCartItem)
  delete(ctx: StateContext<ShoppingCarStateModel>, {id}: DeleteCartItem) {
    const stateModel = ctx.getState();

    const index = stateModel.items.findIndex(item => item.productId === id);
    if (index === -1) return;

    const itemToDelete = {...stateModel.items[index]};

    if (itemToDelete.quantity > 1) {
      const newTotal = stateModel.total - itemToDelete.priceSnapshot;
      itemToDelete.quantity -= 1;

      const updatedItems = [...stateModel.items];
      updatedItems[index] = itemToDelete;
      ctx.patchState({items: updatedItems, total: newTotal});
    } else {
      const updatedItems = stateModel.items.filter(value => value.productId !== id);

      ctx.patchState({items: updatedItems, total: stateModel.total - itemToDelete.priceSnapshot});
    }
  }
}
