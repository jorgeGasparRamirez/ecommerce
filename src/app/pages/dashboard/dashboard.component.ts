import {Component, computed, inject, signal, Signal} from '@angular/core';
import {CategoryStripComponent} from '../category-strip/category-strip.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {ProductListComponent} from '../product/list-card/product.list.component';
// import {Observable} from 'rxjs';
import {NgClass} from '@angular/common';
import {ProductState} from '../../store/product/product.state';
import {Store} from '@ngxs/store';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [CategoryStripComponent, ProductListComponent, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  // emptyProduct$: Observable<boolean>;
  store = inject(Store);
  emptyProduct: Signal<boolean> = toSignal(this.store.select(ProductState.emptyProducts), {initialValue: false});
  visibleStrips = signal(6);

  constructor() {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
      if (result.breakpoints[Breakpoints.Large] || result.breakpoints[Breakpoints.XLarge]) {
        this.visibleStrips.set(7)
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.visibleStrips.set(5);
      } else {
        this.visibleStrips.set(5);
      }
    });
    // this.emptyProduct$ = this.store.select(ProductState.emptyProducts);
  }

  allStrips: { 'name': string, 'description': string, 'thumbnails': string }[] = [{
    'name': 'Panes',
    'description': 'En almacen',
    'thumbnails': './assets/sprites.svg#bread'
  },
    {
      'name': 'Frutas/Vegetales',
      'description': 'En almacen',
      'thumbnails': './assets/sprites.svg#carrot'
    },
    {
      'name': 'Bicicletas',
      'description': 'Por terceros',
      'thumbnails': './assets/sprites.svg#bicycle'
    },
    {
      'name': 'Televisor',
      'description': 'En almacen',
      'thumbnails': './assets/sprites.svg#tv'
    },
    {
      'name': 'Refrigerador',
      'description': 'Por terceros',
      'thumbnails': './assets/sprites.svg#refrigerator'
    },
    {
      'name': 'Casas',
      'description': 'Por terceros',
      'thumbnails': './assets/sprites.svg#house'
    },
    {
      'name': 'Celular',
      'description': 'En almacen',
      'thumbnails': './assets/sprites.svg#cell'
    }
  ];

  strips: Signal<{
    'name': string,
    'description': string,
    'thumbnails': string
  }[]> = computed(() => this.allStrips.slice(0, this.visibleStrips()));

  gridClass: Signal<string> = computed(() => `grid grid-cols-${this.visibleStrips()}  gap-2 gap-y-3`);

}
