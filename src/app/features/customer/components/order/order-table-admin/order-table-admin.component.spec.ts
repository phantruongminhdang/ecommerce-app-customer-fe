import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTableAdminComponent } from './order-table-admin.component';

describe('OrderTableAdminComponent', () => {
  let component: OrderTableAdminComponent;
  let fixture: ComponentFixture<OrderTableAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTableAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
