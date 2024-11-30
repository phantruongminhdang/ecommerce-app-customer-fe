import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProduct, selectProductError, selectProductLoading } from '../../../../state/product/selector/product.selector';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductActions } from '../../../../state/product/action/product.action';
import { CommonModule } from '@angular/common';
import { CartActions } from '../../../../state/cart/action/cart.action';
import { CartItemRequestDTO } from '../../../../shared/models/Cart/CartItemRequestDTO';
import { AppCookieService } from '../../../../shared/services/utils/cookie/app-cookie.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  productId: string | null = null;

  cookie = inject(AppCookieService);
  store = inject(Store);
  activateRoute = inject(ActivatedRoute);

  product$ = this.store.select(selectProduct);
  isLoading$: Observable<boolean> = this.store.select(selectProductLoading);
  error$ = this.store.select(selectProductError);

  quantity: number = 0;

  ngOnInit(): void {
    this.productId = this.activateRoute.snapshot.paramMap.get('productId')
    console.log(this.productId);

    this.getProductById(this.productId);
  }

  getProductById(productId: string | null) {
    if (productId) {
      this.store.dispatch(ProductActions.loadProductById({ productId: productId }));
    }
  }

  changeQuantity(quantity: number) {
    this.quantity += quantity
  }

  addToCart(productId: string | null) {
    if (productId) {
      if (!this.cookie.get('token')) {
        alert('Please login to continue!');
      }
      const cartItemRequestDTO: CartItemRequestDTO = {
        productId: productId,
        quantity: this.quantity
      }
      this.store.dispatch(CartActions.addToCart({ cartItemRequestDTO }))
    }
  }
}
