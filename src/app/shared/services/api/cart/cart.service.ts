import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartResponseDTO } from '../../../models/Cart/CartResponseDTO';
import { Observable } from 'rxjs';
import { Constant } from '../constant/constant';
import { CartItemRequestDTO } from '../../../models/Cart/CartItemRequestDTO';
import { CheckoutRequest } from '../../../models/Cart/CheckoutRequest';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getCart(): Observable<CartResponseDTO> {
    return this.http.get<CartResponseDTO>(Constant.API_URL + Constant.API_RESOURCES.CART.GET_BY_USER);
  }

  addToCart(cartItemRequestDTO: CartItemRequestDTO): Observable<CartResponseDTO> {
    return this.http.post<CartResponseDTO>(
      Constant.API_URL + Constant.API_RESOURCES.CART.ADD_TO_CART,
      cartItemRequestDTO
    );
  }

  removeToCart(cartItemId: string): Observable<CartResponseDTO> {
    return this.http.post<CartResponseDTO>(
      Constant.API_URL + Constant.API_RESOURCES.CART.REMOVE_TO_CART(cartItemId),
      null
    );
  }

  checkoutCart(checkoutRequest: CheckoutRequest): Observable<any> {
    return this.http.post(
      Constant.API_URL + Constant.API_RESOURCES.CART.CHECKOUT_CART,
      checkoutRequest
    );
  }
}
