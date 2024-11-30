import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCart, selectCartError, selectCartLoading, selectCartTotalPrice } from '../../../state/cart/selector/cart.selector';
import { Observable } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { CommonModule } from '@angular/common';
import { CartActions } from '../../../state/cart/action/cart.action';
import { CheckoutRequest } from '../../models/Cart/CheckoutRequest';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart-detail-popup',
  standalone: true,
  imports: [CartItemComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './cart-detail-popup.component.html',
  styleUrl: './cart-detail-popup.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('500ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class CartDetailPopupComponent {

  @Output() close = new EventEmitter<void>();

  store = inject(Store);
  formBuilder = inject(FormBuilder);

  cart$ = this.store.select(selectCart)
  isLoading$: Observable<boolean> = this.store.select(selectCartLoading)
  error$ = this.store.select(selectCartError)
  totalPrice$ = this.store.select(selectCartTotalPrice)

  checkoutRequest: CheckoutRequest = {
    address: '',
    note: ''
  }

  address: FormControl = new FormControl('', Validators.required)
  note: FormControl = new FormControl('', Validators.required)

  checkoutForm = this.formBuilder.group({
    address: this.address,
    note: this.note
  })

  ngOnInit(): void {
    this.cart$.subscribe(res => {
      console.log(res);

    })

  }

  checkout() {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);

      this.checkoutRequest = { address: this.checkoutForm.value.address, note: this.checkoutForm.value.address }

      this.store.dispatch(CartActions.checkout({ checkoutRequest: this.checkoutRequest }))
      this.checkoutForm.reset();
      this.onClose();
    }
  }

  onClose() {
    this.close.emit();
  }
}
