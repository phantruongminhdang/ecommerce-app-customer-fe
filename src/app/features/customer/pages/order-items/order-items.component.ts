import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { OrderService } from '../../../../shared/services/api/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderItemResponseDTO } from '../../../../shared/models/Order/OrderItemResponseDTO';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { OrderActions } from '../../../../state/order/action/order.action';
import { selectOrder, selectOrderError, selectOrderItems, selectOrderItemsError, selectOrderItemsLoading, selectOrderItemsTotal, selectOrderLoading } from '../../../../state/order/selector/order.selector';
import { Observable } from 'rxjs';
import { OrderDetailSkeletonComponent } from "../../components/order/skeleton/order-detail-skeleton/order-detail-skeleton.component";
@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [CommonModule, OrderDetailSkeletonComponent],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css',

})
export class OrderItemsComponent {

  orderId: string | null = null;
  public totalCount = 0;
  public pageIndex = 0;
  public pageSize = 3;

  orderService = inject(OrderService);
  activateRoute = inject(ActivatedRoute);
  store = inject(Store);

  order$ = this.store.select(selectOrder);
  isLoadingOrder$: Observable<boolean> = this.store.select(selectOrderLoading);
  errorOrder$ = this.store.select(selectOrderError);

  orderItems$ = this.store.select(selectOrderItems);
  isLoadingOrderItems$: Observable<boolean> = this.store.select(selectOrderItemsLoading);
  errorOrderItems$ = this.store.select(selectOrderItemsError);
  totalCount$ = this.store.select(selectOrderItemsTotal);
  constructor() {
    console.log("aaaaa");

    this.orderItems = [];
    this.orderItems$.subscribe((res) => {
      if (res) {
        this.orderItems = [...this.orderItems, ...res.items];
        this.totalCount = res.totalItemsCount;
        console.log(res);
      }
    })
  }

  orderItems: OrderItemResponseDTO[] = [];

  @ViewChild('scrollContainer', { static: false }) public scrollContainer: ElementRef = new ElementRef(null);

  ngOnInit(): void {
    this.orderItems = [];
    this.orderId = this.activateRoute.snapshot.paramMap.get('orderId')
    console.log(this.orderId);

    this.getOrderItemsByOrderId(this.orderId, this.pageIndex, this.pageSize);
    this.getOrderById(this.orderId);
    this.pageIndex += 1;
  }

  getOrderItemsByOrderId(orderId: string | null, pageIndex: number = 0, pageSize: number = 3): void {
    if (orderId) {
      this.store.dispatch(OrderActions.loadOrderItems({ orderId: orderId, pageIndex: pageIndex, pageSize: pageSize }));
    }
  }

  getOrderById(orderId: string | null) {
    if (orderId) {
      this.store.dispatch(OrderActions.loadOrderById({ orderId: orderId }));
    }
  }

  onScrollLoadData() {
    const nativeElement = this.scrollContainer.nativeElement
    this.isLoadingOrderItems$.subscribe((res) => {
      if (res == false) {
        if (nativeElement.clientHeight + Math.round(nativeElement.scrollTop) === nativeElement.scrollHeight && this.orderItems.length < this.totalCount) {
          this.getOrderItemsByOrderId(this.orderId, this.pageIndex, this.pageSize);
          this.pageIndex += 1;
          console.log(this.orderItems.length, this.totalCount);
          console.log(this.orderItems);

        }
      }
    })


  }
}
