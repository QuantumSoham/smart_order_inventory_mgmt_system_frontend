import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart';
import { OrderService } from '../../core/services/orders';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl:'./checkout.css'
})
export class CheckoutComponent {

  orderPlaced = false; 

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  placeOrder(form: any) {
    if (form.invalid) return;

    const payload = {
      userId: localStorage.getItem("userId") || 2,
      warehouseId: this.cartService.getWarehouseId(),
      shippingName: form.value.shippingName,
      shippingPhone: form.value.shippingPhone,
      shippingAddress: form.value.shippingAddress,
      city: form.value.city,
      state: form.value.state,
      pincode: form.value.pincode,
      items: this.cartService.getItems().map(i => ({
        productId: i.productId,
        quantity: i.quantity
      }))
    };

    this.orderService.placeOrder(payload).subscribe({
      next: () => {
        this.cartService.clear();
        this.orderPlaced = true; // 🔥 show modal
        form.reset();
      },
      error: err => console.error(err)
    });
  }

  closeModal() {
    this.orderPlaced = false;
  }
}

