import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderResponseDTO } from '../../../models/Order/OrderResponseDTO';
import { Constant } from '../constant/constant';
import { OrderRequestDTO } from '../../../models/Order/OrderRequestDTO';
import { OrderItemResponseDTO } from '../../../models/Order/OrderItemResponseDTO';
import { Pagination } from '../../../models/Pagination/Pagination';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  // API FOR ORDERS
  getAllOrders(pageIndex: number = 0, pageSize: number = 10): Observable<Pagination<OrderResponseDTO>> {
    return this.http.get<Pagination<OrderResponseDTO>>(Constant.API_URL + Constant.API_RESOURCES.ORDERS.GET_ALL + `?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getAllOrdersForCustomer(pageIndex: number = 0, pageSize: number = 10): Observable<Pagination<OrderResponseDTO>> {
    return this.http.get<Pagination<OrderResponseDTO>>(Constant.API_URL + Constant.API_RESOURCES.ORDERS.GET_ALL + `/Customer?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getOrderById(orderId: string): Observable<OrderResponseDTO> {
    return this.http.get<OrderResponseDTO>(Constant.API_URL + Constant.API_RESOURCES.ORDERS.GET_BY_ID(orderId));
  }

  saveOrder(orderId: string, orderStatus: string): Observable<any> {
    return this.http.patch(
      Constant.API_URL + Constant.API_RESOURCES.ORDERS.GET_BY_ID(orderId) + `?orderStatus=${orderStatus}`, null
    )
  }

  addOrder(orderObj: OrderRequestDTO): Observable<any> {
    return this.http.post(
      Constant.API_URL + Constant.API_RESOURCES.ORDERS.GET_ALL,
      orderObj
    )
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(Constant.API_URL + Constant.API_RESOURCES.ORDERS.GET_BY_ID(orderId));
  }

  // API FOR ORDER ITEMS

  getAllOrderItems(): Observable<OrderItemResponseDTO[]> {
    return this.http.get<OrderItemResponseDTO[]>(Constant.API_URL + Constant.API_RESOURCES.ORDER_ITEMS.GET_ALL);
  }

  getOrderItemById(orderItemId: string): Observable<OrderItemResponseDTO> {
    return this.http.get<OrderItemResponseDTO>(Constant.API_URL + Constant.API_RESOURCES.ORDER_ITEMS.GET_BY_ID(orderItemId));
  }

  getOrderItemsByOrderId(orderId: string, pageIndex: number = 0, pageSize: number = 3): Observable<Pagination<OrderItemResponseDTO>> {
    return this.http.get<Pagination<OrderItemResponseDTO>>(Constant.API_URL + Constant.API_RESOURCES.ORDER_ITEMS.GET_BY_ORDER_ID(orderId) + `?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
}
