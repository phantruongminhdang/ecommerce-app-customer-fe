import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { OrderActions } from "../action/order.action";
import { OrderService } from "../../../shared/services/api/order/order.service";

@Injectable()
export class OrderEffect {

    private actions$ = inject(Actions);
    private orderService = inject(OrderService)

    loadOrder$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(OrderActions.loadOrder),
            switchMap((arg) =>
                this.orderService.getAllOrdersForCustomer(arg.pageIndex, arg.pageSize).pipe(
                    map((orders) => OrderActions.loadOrderSuccess({ orders })),
                    catchError((error) => of(OrderActions.loadOrderFailure({ error })))
                )
            )
        )
    );

    loadOrderById$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(OrderActions.loadOrderById),
            switchMap((arg) =>
                this.orderService.getOrderById(arg.orderId).pipe(
                    map((order) => OrderActions.loadOrderByIdSuccess({ order })),
                    catchError((error) => of(OrderActions.loadOrderByIdFailure({ error })))
                )
            )
        )
    );

    loadOrderItems$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(OrderActions.loadOrderItems),
            switchMap((arg) =>
                this.orderService.getOrderItemsByOrderId(arg.orderId, arg.pageIndex, arg.pageSize).pipe(
                    map((orderItems) => OrderActions.loadOrderItemsSuccess({ orderItems })),
                    catchError((error) => of(OrderActions.loadOrderItemsFailure({ error })))
                )
            )
        )
    );
}