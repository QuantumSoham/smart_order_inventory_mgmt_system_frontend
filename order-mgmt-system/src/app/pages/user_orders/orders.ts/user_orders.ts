import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserOrdersService } from '../../../core/services/user_orders';

@Component({
  standalone:true,
  selector: 'app-userorders.ts',
  imports: [CommonModule],
  templateUrl: './user_orders.html',
  styleUrl: './user_orders.css',
})
export class UserOrdersComponent implements OnInit {

 orders: any[] = [];
  loading = false;
  error = '';
showCancelModal = false;
selectedOrder: any = null;

  constructor(private userOrderService: UserOrdersService, private cdr:ChangeDetectorRef) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      this.error = 'User not logged in';
      return;
    }

    this.loading = true;
    this.error = '';

    this.userOrderService.getOrdersByUser(userId).subscribe({
      next: res => {
        this.orders = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load orders';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

getStatusClass(status: string): string {
  switch (status) {
    case 'CREATED': return 'status-created';
    case 'APPROVED': return 'status-approved';
    case 'PACKED': return 'status-packed';
    case 'SHIPPED': return 'status-shipped';
    case 'DELIVERED': return 'status-delivered';
    default: return '';
  }
}
canCancel(status: string): boolean {
  return status === 'CREATED' || status === 'APPROVED';
}

openCancelModal(order: any) {
  this.selectedOrder = order;
  this.showCancelModal = true;
}

closeCancelModal() {
  this.showCancelModal = false;
  this.selectedOrder = null;
}

confirmCancel() {
  if (!this.selectedOrder) return;

  this.userOrderService
    .cancelOrder(this.selectedOrder.id)
    .subscribe({
      next: () => {
        this.closeCancelModal();
        this.loadOrders(); // refresh list
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to cancel order';
        this.closeCancelModal();
      }
    });
}

}
