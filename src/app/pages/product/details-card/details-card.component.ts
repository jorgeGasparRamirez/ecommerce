import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngxs/store';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProductState} from '../../../store/product/product.state';
import {NgOptimizedImage} from '@angular/common';
import {DoublePipe, NumberFragment} from '../../../core/common/pipes/double.pipe';


@Component({
  selector: 'app-details-card',
  imports: [NgOptimizedImage, DoublePipe],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.css'
})
export class DetailsCardComponent {
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);

  routeParams = toSignal(this.activatedRoute.params, {initialValue: {id: '0'}});

  idProduct = computed(() => Number(this.routeParams().id));
  selectedImg = signal('');

  product = computed(() => this.store.selectSignal(ProductState.getProductById)()(this.idProduct()));

  myEffect = effect(() => {
    const prod = this.product();
    console.log(`Hay ThumbnailsUrl` + prod?.thumbnailsUrl);
    if (prod) {
      this.selectedImg.set(prod!.imageUrl);
    }
  });

  zoomThumbnail(url: string) {
    this.selectedImg.set(url);
  }

  protected readonly NumberFragment = NumberFragment;
}
