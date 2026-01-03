import { Routes } from '@angular/router';
import { InventoryPage } from './pages/inventory/inventory';
import {  CartPage } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';

export const routes: Routes = [
      { path: '', component: InventoryPage },
  { path: 'cart', component: CartPage },
  {path:'checkout', component:CheckoutComponent}
];
