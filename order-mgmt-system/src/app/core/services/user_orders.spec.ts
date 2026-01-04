import { TestBed } from '@angular/core/testing';

import { UserOrdersService as OrdersTs } from './user_orders';

describe('OrdersTs', () => {
  let service: OrdersTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
