import { Component, inject, Input } from '@angular/core';
import { ProductResponseDTO } from '../../../../../shared/models/Product/ProductResponseDTO';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CartActions } from '../../../../../state/cart/action/cart.action';
import { CartItemRequestDTO } from '../../../../../shared/models/Cart/CartItemRequestDTO';
import { AppCookieService } from '../../../../../shared/services/utils/cookie/app-cookie.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.css'
})
export class PopularProductComponent {
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
