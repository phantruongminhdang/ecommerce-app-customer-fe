import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailSkeletonComponent } from './order-detail-skeleton.component';

describe('OrderDetailSkeletonComponent', () => {
  let component: OrderDetailSkeletonComponent;
  let fixture: ComponentFixture<OrderDetailSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
