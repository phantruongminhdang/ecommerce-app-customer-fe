import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUpdatePopupAdminComponent } from './order-update-popup-admin.component';

describe('OrderUpdatePopupAdminComponent', () => {
  let component: OrderUpdatePopupAdminComponent;
  let fixture: ComponentFixture<OrderUpdatePopupAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderUpdatePopupAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderUpdatePopupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
