import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingService } from '../../../core/services/billing';
import { forkJoin } from 'rxjs';
@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.html'
})
export class InvoicesComponent implements OnInit {

  userId = 42; 
  invoices: any[] = [];
  loading = false;

  constructor(private billingService: BillingService) {}

  ngOnInit() {
    this.loadInvoices();
  }

  // loadInvoices() {
  //   this.loading = true;

  //   this.billingService.getOrdersByUser(this.userId)
  //     .subscribe(orders => {

  //       orders.forEach(order => {
  //         this.billingService.getInvoiceByOrder(order.orderId)
  //           .subscribe(invoice => {
  //             this.invoices.push(invoice);
  //           });
  //       });
  //       console.log(this.invoices);
  //       this.loading = false;
  //     });
  // }
  loadInvoices() {
  this.loading = true;

  this.billingService.getOrdersByUser(this.userId)
    .subscribe(orders => {

      const requests = orders.map(o =>
        this.billingService.getInvoiceByOrder(o.orderId)
      );

      forkJoin(requests).subscribe(invoices => {
        this.invoices = invoices; 
        this.loading = false;
      });
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
