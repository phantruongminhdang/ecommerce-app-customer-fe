import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderResponseDTO } from '../../../../../shared/models/Order/OrderResponseDTO';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-table-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-table-admin.component.html',
  styleUrl: './order-table-admin.component.css'
})
export class OrderTableAdminComponent {
  @Input() orderList: OrderResponseDTO[] | null = [];
  @Output() editOrder = new EventEmitter<string>();
  @Output() viewOrderItems = new EventEmitter<string>();
  // @Output() addProduct = new EventEmitter<void>();

  onEditOrder(orderId: string) {
    this.editOrder.emit(orderId);
  }

  onViewOrderItems(orderId: string) {
    this.viewOrderItems.emit(orderId);
  }

  // onAddProduct() {
  //   this.addProduct.emit();
  // }

}
