import { TestBed } from '@angular/core/testing';

import { InventoryService as Inventory } from './inventory';

describe('Inventory', () => {
  let service: Inventory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inventory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
