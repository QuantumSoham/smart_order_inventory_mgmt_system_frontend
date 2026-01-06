import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl:'./cart.css'
})
export class CartPage implements OnInit {

  items: any[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$
      .subscribe(items => {
        this.items = items;
        this.total = this.cartService.getTotalAmount();
      });
  }
  increment(id: number) {
  this.cartService.increment(id);
}

decrement(id: number) {
  this.cartService.decrement(id);
}
clearCart() {
  this.cartService.clear();
}

}
