import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CartResponseDTO } from "../../../shared/models/Cart/CartResponseDTO";
import { CartItemRequestDTO } from "../../../shared/models/Cart/CartItemRequestDTO";
import { CheckoutRequest } from "../../../shared/models/Cart/CheckoutRequest";

export const CartActions = createActionGroup({
    source: 'cart',
    events: {
        'Load Cart': emptyProps,
        'Load Cart Success': props<{ cart: CartResponseDTO }>(),
        'Load Cart Failure': props<{ error: any }>(),

        'AddToCart': props<{ cartItemRequestDTO: CartItemRequestDTO }>(),
        'RemoveToCart': props<{ cartItemId: string }>(),
        'Checkout': props<{ checkoutRequest: CheckoutRequest }>()
    }
})