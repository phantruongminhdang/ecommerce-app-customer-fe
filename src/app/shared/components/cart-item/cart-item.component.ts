import { Component, inject, Input } from '@angular/core';
import { CartItemResponseDTO } from '../../models/Cart/CartItemResponseDTO';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CartActions } from '../../../state/cart/action/cart.action';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() item: CartItemResponseDTO = {
    id: '',
    cartId: '',
    productName: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
    code: ''
  };

  store = inject(Store);

  removeToCart(cartItemId: string) {
    console.log(cartItemId);

    this.store.dispatch(CartActions.removeToCart({ cartItemId }));
  }

  // changeItemQuantity(amount: number) {
  //   console.log(this.item1.quantity, amount);

  //   this.item1.quantity += amount;
  // }
}
