import { createActionGroup, props } from "@ngrx/store";
import { Pagination } from "../../../shared/models/Pagination/Pagination";
import { OrderResponseDTO } from "../../../shared/models/Order/OrderResponseDTO";
import { OrderItemResponseDTO } from "../../../shared/models/Order/OrderItemResponseDTO";

export const OrderActions = createActionGroup({
    source: 'order',
    events: {
        'Load Order': props<{ pageIndex: number, pageSize: number }>(),
        'Load Order Success': props<{ orders: Pagination<OrderResponseDTO> }>(),
        'Load Order Failure': props<{ error: any }>(),

        'Load Order By Id': props<{ orderId: string }>(),
        'Load Order By Id Success': props<{ order: OrderResponseDTO }>(),
        'Load Order By Id Failure': props<{ error: any }>(),

        'Load Order Items': props<{ orderId: string, pageIndex: number, pageSize: number }>(),
        'Load Order Items Success': props<{ orderItems: Pagination<OrderItemResponseDTO> }>(),
        'Load Order Items Failure': props<{ error: any }>(),
    }
})