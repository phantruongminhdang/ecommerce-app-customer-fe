import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { CartActions } from "../action/cart.action";
import { CartService } from "../../../shared/services/api/cart/cart.service";

@Injectable()
export class CartEffect {

    loadCart$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(CartActions.loadCart),
            switchMap(() =>
                this.cartService.getCart().pipe(
                    map((cart) => CartActions.loadCartSuccess({ cart })),
                    catchError((error) => (
                        alert(error.error),
                        of(CartActions.loadCartFailure({ error }))))
                )
            )
        )
    );

    addToCart$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(CartActions.addToCart),
            switchMap((arg) =>
                this.cartService.addToCart(arg.cartItemRequestDTO).pipe(
                    map((cart) => (CartActions.loadCartSuccess({ cart }))),
                    catchError((error) => (
                        alert(error.error),
                        of(CartActions.loadCartFailure({ error }))
                    ))
                )
            )
        )
    );

    removeToCart$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(CartActions.removeToCart),
            switchMap((arg) =>
                this.cartService.removeToCart(arg.cartItemId).pipe(
                    map((cart) => CartActions.loadCartSuccess({ cart })),
                    catchError((error) => (
                        alert(error.error),
                        of(CartActions.loadCartFailure({ error }))))
                )
            )
        )
    );

    checkout$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(CartActions.checkout),
            switchMap((arg) =>
                this.cartService.checkoutCart(arg.checkoutRequest).pipe(
                    map((cart) => CartActions.loadCartSuccess({ cart })),
                    catchError((error) => of(CartActions.loadCartFailure({ error })))
                )
            )
        )
    )

    private actions$ = inject(Actions);
    private cartService = inject(CartService);

}