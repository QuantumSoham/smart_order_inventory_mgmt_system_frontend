import { TestBed } from '@angular/core/testing';

import { BillingReports } from './billing-reports';

describe('BillingReports', () => {
  let service: BillingReports;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingReports);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
