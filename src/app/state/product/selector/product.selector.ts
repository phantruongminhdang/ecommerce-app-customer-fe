import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductResponseDTO } from "../../../shared/models/Product/ProductResponseDTO";
import { Pagination } from "../../../shared/models/Pagination/Pagination";
import { AppState } from "../../app.state";

export const selectProductState = createFeatureSelector<{
    productResponseDTOPagination: AppState<Pagination<ProductResponseDTO>>,
    product: AppState<ProductResponseDTO>
}>('product')

export const selectProducts = createSelector(
    selectProductState,
    (state) => state.productResponseDTOPagination.data
)

export const selectProductsLoading = createSelector(
    selectProductState,
    (state) => state.productResponseDTOPagination.loading
)

export const selectProductsError = createSelector(
    selectProductState,
    (state) => state.productResponseDTOPagination.error
)

export const selectProduct = createSelector(
    selectProductState,
    (state) => state.product.data
)

export const selectProductLoading = createSelector(
    selectProductState,
    (state) => state.product.loading
)

export const selectProductError = createSelector(
    selectProductState,
    (state) => state.product.error
)