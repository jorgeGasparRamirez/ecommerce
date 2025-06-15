import {Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {Store} from '@ngxs/store';
import {ShoppingCarState} from '../../store/shopping-cart/shopping-car.state';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  store = inject(Store);
  totalItems = toSignal(this.store.select(ShoppingCarState.totalItemsInCart), {initialValue: 0});
  showTotalItems = computed(() => this.totalItems() > 0);
}
