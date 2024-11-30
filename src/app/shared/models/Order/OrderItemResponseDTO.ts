import { ProductResponseDTO } from "../Product/ProductResponseDTO"

export interface OrderItemResponseDTO {
    id: string
    orderId: string
    productId: string
    quantity: number
    productDTO: ProductResponseDTO
}