import { createFeature, createReducer, on } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Pagination } from "../../../shared/models/Pagination/Pagination";
import { OrderResponseDTO } from "../../../shared/models/Order/OrderResponseDTO";
import { OrderActions } from "../action/order.action";
import { OrderItemResponseDTO } from "../../../shared/models/Order/OrderItemResponseDTO";

// Initial state for products
export const initialState = {
    orderResponsDTOPagination: {
        data: null,
        loading: false,
        error: null
    } as AppState<Pagination<OrderResponseDTO>>,
    orderItems: {
        data: null,
        loading: false,
        error: null
    } as AppState<Pagination<OrderItemResponseDTO>>,
    order: {
        data: null,
        loading: false,
        error: null
    } as AppState<OrderResponseDTO>,

}

// Reducer for orders (fetched from API)
export const orderFeature = createFeature(
    {
        name: 'order',
        reducer: createReducer(
            initialState,
            on(OrderActions.loadOrder, (state) => {
                return {
                    ...state,
                    orderResponsDTOPagination: {
                        ...state.orderResponsDTOPagination,
                        loading: true
                    }
                }
            }),
            on(OrderActions.loadOrderSuccess, (state, { orders }) => {
                return {
                    ...state,
                    orderResponsDTOPagination: {
                        ...state.orderResponsDTOPagination,
                        loading: false,
                        data: orders
                    }
                }
            }),
            on(OrderActions.loadOrderFailure, (state, { error }) => {
                return {
                    ...state,
                    orderResponsDTOPagination: {
                        ...state.orderResponsDTOPagination,
                        loading: false,
                        error: error
                    }
                }
            }),
            on(OrderActions.loadOrderById, (state) => {
                return {
                    ...state,
                    order: {
                        ...state.order,
                        loading: true
                    }
                }
            }),
            on(OrderActions.loadOrderByIdSuccess, (state, { order }) => {
                return {
                    ...state,
                    order: {
                        ...state.order,
                        loading: false,
                        data: order
                    }
                }
            }),
            on(OrderActions.loadOrderByIdFailure, (state, { error }) => {
                return {
                    ...state,
                    order: {
                        ...state.order,
                        loading: false,
                        error: error
                    }
                }
            }),
            on(OrderActions.loadOrderItems, (state) => {
                return {
                    ...state,
                    orderItems: {
                        ...state.orderItems,
                        loading: true
                    }
                }
            }),
            on(OrderActions.loadOrderItemsSuccess, (state, { orderItems }) => {
                return {
                    ...state,
                    orderItems: {
                        ...state.orderItems,
                        loading: false,
                        data: orderItems
                    }
                }
            }),
            on(OrderActions.loadOrderByIdFailure, (state, { error }) => {
                return {
                    ...state,
                    orderItems: {
                        ...state.orderItems,
                        loading: false,
                        error: error
                    }
                }
            })
        ),
    }
)