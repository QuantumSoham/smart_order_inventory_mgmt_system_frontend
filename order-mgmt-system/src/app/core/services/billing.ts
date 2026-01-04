import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BillingService {

  private billingUrl = 'http://localhost:8051'; 
  private orderUrl = 'http://localhost:8051';

  constructor(private http: HttpClient) {}

  getOrdersByUser(userId: number) {
    return this.http.get<any[]>(
      `${this.orderUrl}/orders/user/${userId}`
    );
  }

  getInvoiceByOrder(orderId: number) {
    return this.http.get<any>(
      `${this.billingUrl}/billing/invoices/${orderId}`
    );
  }

  payInvoice(invoiceId: number) {
    return this.http.post(
      `${this.billingUrl}/billing/invoices/${invoiceId}/pay`,
      {}
    );
  }
}
