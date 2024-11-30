import { Component, inject } from '@angular/core';
import { OrderTableAdminComponent } from '../../components/order/order-table-admin/order-table-admin.component';
import { OrderUpdatePopupAdminComponent } from '../../components/order/order-update-popup-admin/order-update-popup-admin.component';
import { CommonModule } from '@angular/common';
import { TablePaginationAdminComponent } from '../../components/table-pagination-admin/table-pagination-admin.component';
import { OrderTableSkeletonComponent } from '../../components/order/skeleton/order-table-skeleton/order-table-skeleton.component';
import { OrderService } from '../../../../shared/services/api/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectOrders, selectOrdersError, selectOrdersLoading } from '../../../../state/order/selector/order.selector';
import { Observable } from 'rxjs';
import { OrderActions } from '../../../../state/order/action/order.action';

@Component({
  selector: 'app-order-view-page',
  standalone: true,
  imports: [OrderTableAdminComponent, OrderUpdatePopupAdminComponent, CommonModule, TablePaginationAdminComponent, OrderTableSkeletonComponent],
  templateUrl: './order-view-page.component.html',
  styleUrl: './order-view-page.component.css'
})
export class OrderViewPageComponent {
  orderService = inject(OrderService);
  activateRoute = inject(ActivatedRoute);
  store = inject(Store);

  pageIndex: number = 0;
  pageSize: number = 10;

  paginationOrder$ = this.store.select(selectOrders);
  isLoading$: Observable<boolean> = this.store.select(selectOrdersLoading);
  error$ = this.store.select(selectOrdersError);

  showModifyOrder = false;
  //showCreateProduct = false;
  selectedUpdateOrderId: string = "";

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.pageIndex = Number.parseInt(params.get('pageIndex') || '0');
      this.pageSize = Number.parseInt(params.get('pageSize') || '10');

      this.getAllOrders();
    })
  }

  getAllOrders() {
    this.store.dispatch(OrderActions.loadOrder({ pageIndex: this.pageIndex, pageSize: this.pageSize }))
  }

  onEditOrder(orderId: string) {
    this.selectedUpdateOrderId = orderId;
    this.showModifyOrder = true;
  }

  onSaveOrder(orderStatus: string) {
    // Implement save logic
    this.orderService.saveOrder(this.selectedUpdateOrderId, orderStatus).subscribe({
      next: (res: any) => {
        alert(res.msg);
        this.getAllOrders();
        this.showModifyOrder = false;
      },
      error: (err) => {
        console.log(err.error);

        alert(err.error);
      }
    }
    )
  }

  onCloseModifyOrder() {
    this.showModifyOrder = false;
  }
}
