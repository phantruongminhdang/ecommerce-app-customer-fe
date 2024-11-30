import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailPopupComponent } from './cart-detail-popup.component';

describe('CartDetailPopupComponent', () => {
  let component: CartDetailPopupComponent;
  let fixture: ComponentFixture<CartDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDetailPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
