import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingService } from '../../../core/services/billing';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.html'
})
export class InvoicesComponent implements OnInit {

  userId = 2; // 🔒 hardcoded for now
  invoices: any[] = [];
  loading = false;

  constructor(private billingService: BillingService) {}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.loading = true;

    this.billingService.getOrdersByUser(this.userId)
      .subscribe(orders => {

        orders.forEach(order => {
          this.billingService.getInvoiceByOrder(order.orderId)
            .subscribe(invoice => {
              this.invoices.push(invoice);
            });
        });

        this.loading = false;
      });
  }

  pay(invoiceId: number) {
    this.billingService.payInvoice(invoiceId)
      .subscribe({
        next: () => {
          alert('Payment successful');
          this.invoices = [];
          this.loadInvoices();
        },
        error: err => {
          console.error(err);
          alert('Payment failed');
        }
      });
  }
}
