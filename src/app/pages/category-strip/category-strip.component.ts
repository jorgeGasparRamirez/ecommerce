import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-category-strip',
  imports: [],
  templateUrl: './category-strip.component.html',
  styleUrl: './category-strip.component.css'
})
export class CategoryStripComponent {
  @Input() categoryName!: string;
  @Input() deliveryType!: string;
  @Input() deliveryImage!: string;
}
