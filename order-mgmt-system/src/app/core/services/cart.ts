import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {

  private items: CartItem[] = [];
  private warehouseId?: number;

  private cart$ = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cart$.asObservable();

  setWarehouse(warehouseId: number) {
    if (this.warehouseId && this.warehouseId !== warehouseId) {
      throw new Error('Cart can contain items from only one warehouse');
    }
    this.warehouseId = warehouseId;
  }

  add(product: any) {
    const existing = this.items.find(i => i.productId === product.productId);

    if (existing) {
      existing.quantity += 1;
      existing.totalPrice = existing.quantity * existing.price;
    } else {
      this.items.push({
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: 1,
        totalPrice: product.price
      });
    }

    this.cart$.next([...this.items]);
  }

 

  increment(productId: number) {
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.quantity++;
      item.totalPrice = item.quantity * item.price;
      this.cart$.next([...this.items]);
    }
  }

  decrement(productId: number) {
    const item = this.items.find(i => i.productId === productId);
    if (!item) return;

    item.quantity--;
    if (item.quantity === 0) {
      this.remove(productId);
    } else {
      item.totalPrice = item.quantity * item.price;
      this.cart$.next([...this.items]);
    }
  }

  remove(productId: number) {
    this.items = this.items.filter(i => i.productId !== productId);
    this.cart$.next([...this.items]);
  }

  clear() {
    this.items = [];
    this.warehouseId = undefined;
    this.cart$.next([]);
  }

  getItems() {
    return this.items;
  }

  getWarehouseId() {
    return this.warehouseId;
  }

  getTotalAmount() {
    return this.items.reduce((sum, i) => sum + i.totalPrice, 0);
  }
}

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { CartItem } from '../models/cart-item.model';

// @Injectable({ providedIn: 'root' })
// export class CartService {

//   private items: CartItem[] = [];
//   private warehouseId?: number;
//   private cart$ = new BehaviorSubject<CartItem[]>([]);

//   cartItems$ = this.cart$.asObservable();

//   addItem(product: any) {
//     const existing = this.items.find(
//       i => i.productId === product.id
//     );

//     if (existing) {
//       existing.quantity += 1;
//       existing.totalPrice = existing.quantity * existing.price;
//     } else {
//       this.items.push({
//         productId: product.id,
//         name: product.name,
//         price: product.price,
//         quantity: 1,
//         totalPrice: product.price
//       });
//     }

//     this.cart$.next([...this.items]);
//   }
  
//   add(item: any) {
//     console.log(item);
//     if (this.warehouseId && this.warehouseId !== item.warehouseId) {
//       throw new Error('Orders must be from a single warehouse');
//     }
    

//     const existing = this.items.find(i => i.productId === item.productId);
//     const qty = item.quantity ?? 1;

//     if (existing) {
//       existing.quantity += qty;
//       existing.totalPrice = existing.quantity * existing.price;
//     } else {
//       this.items.push({
//         productId: item.productId,
//         name: item.name,
//         price: item.price,
//         quantity: qty,
//         totalPrice: qty * item.price,
//         warehouseId: item.warehouseId
//       });
//     }

//     this.cart$.next([...this.items]);
//   }
//    getWarehouseId() {
//     return this.warehouseId;
//   }
//   removeItem(productId: number) {
//     this.items = this.items.filter(i => i.productId !== productId);
//     this.cart$.next([...this.items]);
//   }

//   clear() {
//     this.items = [];
//     this.cart$.next([]);
//   }

//   getItems() {
//     return this.items;
//   }

//   getTotalAmount(): number {
//     return this.items.reduce((sum, i) => sum + i.totalPrice, 0);
//   }
// }
