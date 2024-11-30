
export interface OrderRequestDTO {
    customerId: string;
    address: string;
    orderDate: Date;
    expectedDeliveryDate?: Date | null;
    totalPrice: number;
    orderStatus: string;
    note?: string;
}

