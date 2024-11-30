import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { CartResponseDTO } from "../../../shared/models/Cart/CartResponseDTO";

export const selectCartState = createFeatureSelector<AppState<CartResponseDTO>>('cart')

export const selectCart = createSelector(
    selectCartState,
    (state) => state.data
)

export const selectCartLoading = createSelector(
    selectCartState,
    (state) => state.loading
)

export const selectCartError = createSelector(
    selectCartState,
    (state) => state.error
)

export const selectCartTotalItems = createSelector(
    selectCart,
    (cart) => cart?.cartItemResponseDTOs?.length
)

export const selectCartTotalPrice = createSelector(
    selectCart,
    (cart) => cart?.totalPrice
)