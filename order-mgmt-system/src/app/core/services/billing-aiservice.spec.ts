import { TestBed } from '@angular/core/testing';

import { BillingAIService } from './billing-aiservice';

describe('BillingAIService', () => {
  let service: BillingAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
