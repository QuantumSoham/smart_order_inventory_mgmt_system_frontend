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

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  placeOrder(form: any) {
    const payload = {
      userId: 2, // hardcoding user id now till i get my rbac api gateway ready
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
    console.log(payload);
    this.orderService.placeOrder(payload).subscribe({
      next: res => {
        console.log('Order placed', res);
        this.cartService.clear();
      },
      error: err => console.error(err)
    });
  }
}
