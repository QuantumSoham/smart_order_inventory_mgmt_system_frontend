import { TestBed } from '@angular/core/testing';

import { WarehouseService as WarehouseServiceTs } from './warehouse.service';

describe('WarehouseServiceTs', () => {
  let service: WarehouseServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
