import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdersComponent as OrdersTs } from './user_orders.js';

describe('OrdersTs', () => {
  let component: OrdersTs;
  let fixture: ComponentFixture<OrdersTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
