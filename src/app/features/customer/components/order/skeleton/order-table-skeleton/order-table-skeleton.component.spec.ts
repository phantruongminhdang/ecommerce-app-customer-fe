import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTableSkeletonComponent } from './order-table-skeleton.component';

describe('OrderTableSkeletonComponent', () => {
  let component: OrderTableSkeletonComponent;
  let fixture: ComponentFixture<OrderTableSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTableSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTableSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
