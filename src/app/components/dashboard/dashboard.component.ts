import {Component, computed, inject, signal, Signal} from '@angular/core';
import {HeaderComponent} from '../common/header/header.component';
import {CategoryStripComponent} from '../category-strip/category-strip.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, CategoryStripComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

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

  gridClass: Signal<string> = computed(() => `grid grid-cols-${this.visibleStrips()} grid-rows-[repeat(2,90px)] gap-2`);
}
