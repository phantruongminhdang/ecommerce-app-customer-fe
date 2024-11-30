import { createFeature, createReducer, on } from "@ngrx/store";
import { ProductActions } from "../action/product.action";
import { AppState } from "../../app.state";
import { Pagination } from "../../../shared/models/Pagination/Pagination";
import { ProductResponseDTO } from "../../../shared/models/Product/ProductResponseDTO";

// Initial state for products
export const initialState = {
    productResponseDTOPagination: {
        data: null,
        loading: false,
        error: null
    } as AppState<Pagination<ProductResponseDTO>>,
    product: {
        data: null,
        loading: false,
        error: null
    } as AppState<ProductResponseDTO>
}

// Reducer for products (fetched from API)
export const productFeature = createFeature(
    {
        name: 'product',
        reducer: createReducer(
            initialState,
            on(ProductActions.loadProduct, (state) => {
                return {
                    ...state,
                    productResponseDTOPagination: {
                        ...state.productResponseDTOPagination,
                        loading: true
                    }
                }
            }),
            on(ProductActions.filterProduct, (state) => {
                return {
                    ...state,
                    productResponseDTOPagination: {
                        ...state.productResponseDTOPagination,
                        loading: true
                    }
                }
            }),
            on(ProductActions.loadProductSuccess, (state, { products }) => {
                return {
                    ...state,
                    productResponseDTOPagination: {
                        ...state.productResponseDTOPagination,
                        loading: false,
                        data: products
                    }
                }
            }),
            on(ProductActions.loadProductFailure, (state, { error }) => {
                return {
                    ...state,
                    productResponseDTOPagination: {
                        ...state.productResponseDTOPagination,
                        loading: false,
                        error: error
                    }
                }
            }),
            on(ProductActions.loadProductById, (state) => {
                return {
                    ...state,
                    product: {
                        ...state.product,
                        loading: true
                    }
                }
            }),
            on(ProductActions.loadProductByIdSuccess, (state, { product }) => {
                return {
                    ...state,
                    product: {
                        ...state.product,
                        loading: false,
                        data: product
                    }
                }
            }),
            on(ProductActions.loadProductByIdFailure, (state, { error }) => {
                return {
                    ...state,
                    product: {
                        ...state.product,
                        loading: false,
                        error: error
                    }
                }
            }),
        ),
    }
)