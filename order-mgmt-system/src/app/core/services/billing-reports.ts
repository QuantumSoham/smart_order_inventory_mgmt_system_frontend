import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BillingReportsService {

  private baseUrl = 'http://localhost:8051';

  constructor(private http: HttpClient) {}

  revenue(from: string, to: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}/billing/reports/revenue?from=${from}&to=${to}`
    );
  }

  salesByCategory() {
    return this.http.get<any[]>(
      `${this.baseUrl}/billing/reports/sales/category`
    );
  }

  salesByWarehouse() {
    return this.http.get<any[]>(
      `${this.baseUrl}/billing/reports/sales/warehouse`
    );
  }

  topProducts() {
    return this.http.get<any[]>(
      `${this.baseUrl}/billing/reports/top-products`
    );
  }
}

