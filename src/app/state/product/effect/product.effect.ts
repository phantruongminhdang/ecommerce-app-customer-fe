import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductActions } from "../action/product.action";
import { catchError, map, of, switchMap } from "rxjs";
import { ProductService } from "../../../shared/services/api/product/product.service";

@Injectable()
export class ProductEffect {

    loadProduct$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(ProductActions.loadProduct),
            switchMap((arg) =>
                this.productService.getAllProducts(arg.pageIndex, arg.pageSize).pipe(
                    map((products) => ProductActions.loadProductSuccess({ products })),
                    catchError((error) => of(ProductActions.loadProductFailure({ error })))
                )
            )
        )
    );

    filterProduct$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(ProductActions.filterProduct),
            switchMap((arg) =>
                this.productService.filterProducts(
                    arg.pageIndex, arg.pageSize,
                    arg.keyword, arg.categoryId,
                    arg.minPrice, arg.maxPrice
                )
                    .pipe(
                        map((products) => ProductActions.loadProductSuccess({ products })),
                        catchError((error) => of(ProductActions.loadProductFailure({ error })))
                    )
            )
        )
    );

    loadProductById$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(ProductActions.loadProductById),
            switchMap((arg) =>
                this.productService.getProductByIdForCustomer(arg.productId).pipe(
                    map((product) => (
                        ProductActions.loadProductByIdSuccess({ product }))),
                    catchError((error) => of(ProductActions.loadProductByIdFailure({ error })))
                )
            )
        )
    );

    private actions$ = inject(Actions);
    private productService = inject(ProductService)

}