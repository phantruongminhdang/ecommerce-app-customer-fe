import { createActionGroup, props } from "@ngrx/store";
import { ProductResponseDTO } from "../../../shared/models/Product/ProductResponseDTO";
import { Pagination } from "../../../shared/models/Pagination/Pagination";

export const ProductActions = createActionGroup({
    source: 'product',
    events: {
        'Load Product': props<{ pageIndex: number, pageSize: number }>(),
        'Filter Product': props<{ pageIndex: number, pageSize: number, keyword: string, categoryId: string, minPrice: number, maxPrice: number }>(),
        'Load Product Success': props<{ products: Pagination<ProductResponseDTO> }>(),
        'Load Product Failure': props<{ error: any }>(),

        'Load Product By Id': props<{ productId: string }>(),
        'Load Product By Id Success': props<{ product: ProductResponseDTO }>(),
        'Load Product By Id Failure': props<{ error: any }>(),
    }
})