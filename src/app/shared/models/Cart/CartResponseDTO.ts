import { CartItemResponseDTO } from "./CartItemResponseDTO";

export interface CartResponseDTO {
    id: string;
    customerId: string;
    totalPrice: number;
    cartItemResponseDTOs: CartItemResponseDTO[]
}