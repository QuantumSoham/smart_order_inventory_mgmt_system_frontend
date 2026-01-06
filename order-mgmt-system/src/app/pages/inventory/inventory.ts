import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventoryView } from '../../core/models/inventory-view.model';
import { InventoryService } from '../../core/services/inventory';
import { ProductService } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { InventoryRaw } from '../../core/models/inventory.model';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/orders';

@Component({
  standalone: true,
  selector: 'app-inventory',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inventory.html',
  styleUrl:'./inventory.css'
})
export class InventoryPage {

  warehouses: any[] = [];
  selectedWarehouseId!: number;
  inventory: InventoryView[] = [];
  loading = false;
  constructor(
    private inventoryService: InventoryService,
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.inventoryService.getWarehouses()
      .subscribe(w => this.warehouses = w);
  }

  loadInventory() {
    this.inventory=[];
    this.resetCart();
    this.loading = true;

    this.inventoryService.getByWarehouse(this.selectedWarehouseId)
      .subscribe(inv => this.mergeProducts(inv));
  }

  mergeProducts(inv: InventoryRaw[]) {
    forkJoin(
      inv.map(i => this.productService.getProduct(i.productId))
    ).subscribe(products => {

      this.inventory = inv.map((i, idx) => ({
        productId: i.productId,
        category: i.category,
        available: i.available,
        name: products[idx].name,
        price: products[idx].price,
        imageUrl: products[idx].imageUrl
      }));

      this.loading = false;
    });
  }

 addToCart(item: InventoryView) {
  this.cartService.setWarehouse(this.selectedWarehouseId);
  this.cartService.add(item);
}

 resetCart()
 {
  this.cartService.clear();
 }
}
//   testpost() {

//   const cartItems = this.cartService.getItems();

//   const payload = {
//     userId: 2,
//     warehouseId: this.selectedWarehouseId,
//     shippingName: 'Soham',
//     shippingPhone: '9999999999',
//     shippingAddress: '12 MG Road',
//     city: 'Bangalore',
//     state: 'KA',
//     pincode: '560001',
//     items: [
//     { productId: 1, quantity: 2 },
//     { productId: 2, quantity: 1 }
//   ]
//   };

//   console.log('Order payload:', payload);

//   this.orderService.placeOrder(payload)
//     .subscribe({
//       next: res => {
//         console.log('Order placed successfully', res);
//       },
//       error: err => {
//         console.error('Order failed', err);
//       }
//     });
// }
// placeOrder() {
//     this.orderService.createOrder().subscribe({
//       next: (res) => {
//         console.log('Order Success:', res);
//       },
//       error: (err) => {
//         console.error('Order Failed:', err);
//       }
//     });
//   }

