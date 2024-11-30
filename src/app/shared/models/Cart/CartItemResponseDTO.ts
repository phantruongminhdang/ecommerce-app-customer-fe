export interface CartItemResponseDTO {
    id: string,
    cartId: string,
    productName: string,
    imageUrl: string,
    price: number,
    quantity: number,
    code: string,
}