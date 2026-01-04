import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrderService } from '../../../core/services/admin-order-service';
import { Order, OrderStatus } from '../../../core/models/order.model';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class AdminOrderComponent implements OnInit {

  orders: Order[] = [];
  loading = true;

  constructor(private orderService: AdminOrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // ✅ strict workflow
  ORDER_FLOW: Partial<Record<OrderStatus, OrderStatus>> = {
    CREATED: 'APPROVED',
    APPROVED: 'PACKED',
    PACKED: 'SHIPPED',
    SHIPPED: 'DELIVERED'
  };

  // ✅ accept status, not Order
  getNextStatus(status: OrderStatus): OrderStatus | null 
  {
    return this.ORDER_FLOW[status] ?? null;
  }

  // ✅ accept Order, derive next state
  confirmStatusChange(order: Order): void {
    const next = this.getNextStatus(order.status);

    if (!next) return;

    const ok = confirm(
      `Change order #${order.id} from ${order.status} to ${next}?`
    );

    if (!ok) return;

    this.updateOrderStatus(order.id, next);
  }

  // ✅ missing method (now added)
  updateOrderStatus(orderId: number, status: OrderStatus): void {
    this.orderService.updateStatus(orderId, status).subscribe({
      next: () => {
        // update UI locally
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
          order.status = status;
        }
        alert(`Order marked as ${status}`);
      },
      error: () => {
        alert('Failed to update order status');
      }
    });
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: data => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Failed to load orders');
      }
    });
  }
}
