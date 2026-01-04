import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

// order.service.ts
@Injectable({ providedIn: 'root' })
export class AdminOrderService {

  private baseUrl = `http://localhost:8051`;

  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get<Order[]>(`${this.baseUrl}/admin/orders`);
  }

  updateStatus(orderId: number, status: string) {
    return this.http.put(
      `${this.baseUrl}/admin/orders/${orderId}/status/${status}`,
      {}
    );
  }
}
