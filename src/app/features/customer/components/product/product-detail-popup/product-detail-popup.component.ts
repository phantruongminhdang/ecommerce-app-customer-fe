import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-detail-popup',
  standalone: true,
  imports: [],
  templateUrl: './product-detail-popup.component.html',
  styleUrl: './product-detail-popup.component.css'
})
export class ProductDetailPopupComponent {

  @Output() close: any = new EventEmitter();

  onClose() {
    this.close.emit();
  }
}
