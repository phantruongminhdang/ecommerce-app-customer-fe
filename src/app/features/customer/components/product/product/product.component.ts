import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ProductResponseDTO } from '../../../../../shared/models/Product/ProductResponseDTO';
import { Store } from '@ngrx/store';
import { AppCookieService } from '../../../../../shared/services/utils/cookie/app-cookie.service';
import { CartItemRequestDTO } from '../../../../../shared/models/Cart/CartItemRequestDTO';
import { CartActions } from '../../../../../state/cart/action/cart.action';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product: ProductResponseDTO = {
    id: '',
    categoryName: '',
    name: '',
    code: '',
    description: '',
    price: 0,
    imageUrl: '',
    quantity: 0
  }

  store = inject(Store);
  cookie = inject(AppCookieService);

  // ngOnInit() {
  //   console.log(this.product);
  // }

  addToCart(productId: string) {
    if (!this.cookie.get('token')) {
      alert('Please login to continue!');
    }
    const cartItemRequestDTO: CartItemRequestDTO = {
      productId: productId,
      quantity: 1
    }
    this.store.dispatch(CartActions.addToCart({ cartItemRequestDTO }))
  }
}
