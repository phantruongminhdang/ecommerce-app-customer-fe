import { createFeature, createReducer, on } from "@ngrx/store";
import { AppState } from "../../app.state";
import { CartResponseDTO } from "../../../shared/models/Cart/CartResponseDTO";
import { CartActions } from "../action/cart.action";

// Initial state for products
export const initialState: AppState<CartResponseDTO> = {
    data: null,
    loading: false,
    error: null
}

// Reducer for products (fetched from API)
export const cartFeature = createFeature(
    {
        name: 'cart',
        reducer: createReducer(
            initialState,
            on(CartActions.loadCart, (state) => {
                return {
                    ...state,
                    loading: true
                }
            }),
            on(CartActions.loadCartSuccess, (state, { cart }) => {
                return {
                    ...state,
                    loading: false,
                    data: cart
                }
            }),
            on(CartActions.loadCartFailure, (state, { error }) => {
                return {
                    ...state,
                    loading: false,
                    error: error
                }
            }),
            on(CartActions.addToCart, (state) => {
                return {
                    ...state,
                    loading: true
                }
            }),
            on(CartActions.removeToCart, (state) => {
                return {
                    ...state,
                    loading: true
                }
            }),
            on(CartActions.checkout, (state) => {
                return {
                    ...state,
                    loading: true
                }
            })
        ),
    }
)