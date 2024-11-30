import { OrderItemResponseDTO } from "./OrderItemResponseDTO"
import { UserResponseDTO } from "../User/UserReponseDTO"

export interface OrderResponseDTO {
    id: string
    customerId: string
    address: string
    orderDate: Date
    expectedDeliveryDate?: Date
    deliveryDate?: Date
    totalPrice: number
    orderStatus: string
    note?: string
    orderItemResponseDTOs: OrderItemResponseDTO[]
    userResponseDTO: UserResponseDTO
}