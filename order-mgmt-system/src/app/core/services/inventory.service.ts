import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private baseUrl = 'http://localhost:8051';

  constructor(private http: HttpClient) {}

  getByWarehouse(warehouseId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/inventory/warehouse/${warehouseId}`
    );
  }

  createInventory(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/inventory`, payload);
  }

  getLowStock(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/inventory/low-stock`
    );
  }
  // inventory.service.ts
updateInventory(inventoryId: number, payload: any) {
  return this.http.put(
    `${this.baseUrl}/inventory/${inventoryId}`,
    payload
  );
}

}
