import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { InventoryRaw } from '../models/inventory.model';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class InventoryService {

  private base = `http://localhost:8051`;

  getWarehouses() {
    return this.http.get<any[]>(`${this.base}/warehouses`);
  }

  getByWarehouse(warehouseId: number) {
    return this.http.get<InventoryRaw[]>(
      `${this.base}/inventory/warehouse/${warehouseId}`
    );
  }

  constructor(private http:HttpClient) {}
}
