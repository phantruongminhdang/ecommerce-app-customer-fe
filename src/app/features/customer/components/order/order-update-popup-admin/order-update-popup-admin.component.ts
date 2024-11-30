import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { OrderService } from '../../../../../shared/services/api/order/order.service';
import { OrderResponseDTO } from '../../../../../shared/models/Order/OrderResponseDTO';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { OrderStatusList } from '../../../../../shared/models/enums/OrderStatus';

@Component({
  selector: 'app-order-update-popup-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-update-popup-admin.component.html',
  styleUrl: './order-update-popup-admin.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class OrderUpdatePopupAdminComponent {
  @Input() orderId: string | null = null;
  @Input() orderStatusList: string[] = OrderStatusList;
  @Output() save = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  orderService = inject(OrderService);

  formBuilder = inject(FormBuilder);

  order: OrderResponseDTO = {
    address: '',
    customerId: '',
    deliveryDate: new Date(),
    expectedDeliveryDate: new Date(),
    id: '',
    note: '',
    orderDate: new Date(),
    orderItemResponseDTOs: [],
    orderStatus: 'Waiting',
    totalPrice: 0,
    userResponseDTO: {
      id: '',
      fullname: '',
      email: '',
      isLockout: false,
      userName: '',
      role: ''
    },
  };

  getOrderById(orderId: string | null) {
    if (orderId) {
      this.orderService.getOrderById(orderId).subscribe((res: any) => {
        this.order = res;
        this.orderForm.patchValue({ ...this.order, userResponseDTO: this.order.userResponseDTO.email });
        console.log(this.order);
      });
    }
  }

  address: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);
  userResponseDTO: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);
  deliveryDate: FormControl = new FormControl({ value: new Date(), disabled: true }, Validators.required);
  expectedDeliveryDate: FormControl = new FormControl({ value: new Date(), disabled: true }, Validators.required);
  id: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);
  note: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);
  orderDate: FormControl = new FormControl({ value: new Date(), disabled: true }, Validators.required);
  orderItemResponseDTOs: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);
  orderStatus: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);
  totalPrice: FormControl = new FormControl({ value: 0, disabled: true }, [Validators.required, Validators.min(0)]);

  orderForm = this.formBuilder.group({
    address: this.address,
    userResponseDTO: this.userResponseDTO,
    deliveryDate: this.deliveryDate,
    expectedDeliveryDate: this.expectedDeliveryDate,
    id: this.id,
    note: this.note,
    orderDate: this.orderDate,
    orderItemResponseDTOs: this.orderItemResponseDTOs,
    orderStatus: this.orderStatus,
    totalPrice: this.totalPrice
  })

  ngOnChanges() {
    this.getOrderById(this.orderId);

  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.save.emit(this.orderForm.value.orderStatus);
    }
  }

  onEditOrder(orderStatus: string) {
    this.save.emit(orderStatus);
  }

  onClose() {
    this.close.emit();
  }
}
