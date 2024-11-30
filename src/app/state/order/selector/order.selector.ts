import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Pagination } from "../../../shared/models/Pagination/Pagination";
import { AppState } from "../../app.state";
import { OrderResponseDTO } from "../../../shared/models/Order/OrderResponseDTO";
import { OrderItemResponseDTO } from "../../../shared/models/Order/OrderItemResponseDTO";

// Reducer for orders (fetched from API)
export const selectOrderState = createFeatureSelector<{
    orderResponsDTOPagination: AppState<Pagination<OrderResponseDTO>>;
    order: AppState<OrderResponseDTO>;
    orderItems: AppState<Pagination<OrderItemResponseDTO>>
}>('order')

export const selectOrders = createSelector(
    selectOrderState,
    (state) => state.orderResponsDTOPagination.data
)

export const selectOrdersLoading = createSelector(
    selectOrderState,
    (state) => state.orderResponsDTOPagination.loading
)

export const selectOrdersError = createSelector(
    selectOrderState,
    (state) => state.orderResponsDTOPagination.error
)

export const selectOrder = createSelector(
    selectOrderState,
    (state) => state.order.data
)

export const selectOrderLoading = createSelector(
    selectOrderState,
    (state) => state.order.loading
)

export const selectOrderError = createSelector(
    selectOrderState,
    (state) => state.order.error
)

export const selectOrderItems = createSelector(
    selectOrderState,
    (state) => state.orderItems.data
)

export const selectOrderItemsTotal = createSelector(
    selectOrderState,
    (state) => state.orderItems.data?.totalItemsCount
)

export const selectOrderItemsLoading = createSelector(
    selectOrderState,
    (state) => state.orderItems.loading
)

export const selectOrderItemsError = createSelector(
    selectOrderState,
    (state) => state.orderItems.error
)