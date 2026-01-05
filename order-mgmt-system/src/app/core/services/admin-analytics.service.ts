import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminAnalyticsService {

  private base = 'http://localhost:8051/admin/analytics';

  constructor(private http: HttpClient) {}

  getKpis() {
    return this.http.get<any>(`${this.base}/kpis`);
  }

  getOrdersByStatus() {
    return this.http.get<any[]>(`${this.base}/orders-by-status`);
  }

  getOrdersByWarehouse() {
    return this.http.get<any[]>(`${this.base}/orders-by-warehouse`);
  }

  getRevenueByWarehouse() {
    return this.http.get<any[]>(`${this.base}/revenue-by-warehouse`);
  }

  getRevenueByDate(from: string, to: string) {
    return this.http.get<any[]>(
      `${this.base}/revenue-by-date?from=${from}&to=${to}`
    );
  }

  getOrdersByState() {
    return this.http.get<any[]>(`${this.base}/orders-by-state`);
  }
}
