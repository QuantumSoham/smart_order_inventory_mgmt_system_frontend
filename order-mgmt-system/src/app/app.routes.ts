import { Routes } from '@angular/router';
import { InventoryPage } from './pages/inventory/inventory';
import {  CartPage } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { DashboardPage } from './pages/dashboard/dashboard';
import { InvoicesComponent } from './pages/invoices/invoice/invoice';

export const routes: Routes = [
      { path: '', component: InventoryPage },
  { path: 'cart', component: CartPage },
  {path:'checkout', component:CheckoutComponent},
  { path: 'dashboard', component: DashboardPage },
  { path: 'invoices', component: InvoicesComponent}
];
