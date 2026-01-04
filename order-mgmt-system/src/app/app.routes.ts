import { Routes } from '@angular/router';
import { InventoryPage } from './pages/inventory/inventory';
import {  CartPage } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { DashboardPage } from './pages/dashboard/dashboard';
import { InvoicesComponent } from './pages/invoices/invoice/invoice';
import { LoginPage } from './pages/auth/login/login.component/login.component';
import { RegisterPage } from './pages/auth/register/register.component/register.component';
import { UserOrdersComponent } from './pages/user_orders/orders.ts/user_orders';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: '', component: InventoryPage },
  { path: 'cart', component: CartPage },
  {path:'checkout', component:CheckoutComponent},
  { path: 'dashboard', component: DashboardPage },
  { path: 'invoices', component: InvoicesComponent},
  {path:'user-orders', component:UserOrdersComponent}
];
