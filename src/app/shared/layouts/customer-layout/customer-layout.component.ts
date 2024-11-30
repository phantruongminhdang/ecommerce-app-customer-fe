import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomepageHeaderComponent } from "../../components/homepage-header/homepage-header.component";
import { Store } from '@ngrx/store';
import { CartActions } from '../../../state/cart/action/cart.action';
import { CartDetailPopupComponent } from "../../components/cart-detail-popup/cart-detail-popup.component";
import { AppCookieService } from '../../services/utils/cookie/app-cookie.service';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, HomepageHeaderComponent, CartDetailPopupComponent],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

  store = inject(Store)
  cookie = inject(AppCookieService)

  showCartDetailPopup = false
  ngOnInit() {
    this.getCart()
  }
  getCart() {
    if (this.cookie.get('token')) {
      this.store.dispatch(CartActions.loadCart())
    }
  }

  onShowCartDetailPopup() {
    this.showCartDetailPopup = true;
  }

  onCloseCartDetailPopup() {
    this.showCartDetailPopup = false;
  }

}
