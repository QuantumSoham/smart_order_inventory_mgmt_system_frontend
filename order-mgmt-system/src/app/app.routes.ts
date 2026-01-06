import { Routes } from '@angular/router';
import { InventoryPage } from './pages/inventory/inventory';
import {  CartPage } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { DashboardPage } from './pages/dashboard/dashboard';
import { InvoicesComponent } from './pages/invoices/invoice/invoice';
import { LoginPage } from './pages/auth/login/login.component/login.component';
import { RegisterPage } from './pages/auth/register/register.component/register.component';
import { UserOrdersComponent } from './pages/user_orders/orders.ts/user_orders';
import { AdminOrderComponent } from './pages/admin/orders/admin_order_component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard';
import { WarehouseListComponent } from './pages/admin/warehouse/warehouse-list.component/warehouse-list.component';
import { CreateWarehouseComponent } from './pages/admin/warehouse/create-warehouse.component/create-warehouse.component';
import { WarehouseDetailComponent } from './pages/admin/warehouse/warehouse-detail.component/warehouse-detail.component';

export const routes: Routes = [
  {path: 'warehouses',component: WarehouseListComponent  },
  {path: 'warehouses/create',component: CreateWarehouseComponent  },
  {path: 'warehouses/:id',component: WarehouseDetailComponent  },
  { path: 'login', component: LoginPage },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  {path:'admin-orders', component:AdminOrderComponent},
  { path: 'register', component: RegisterPage },
  { path: '', component: InventoryPage },
  { path: 'cart', component: CartPage },
  {path:'checkout', component:CheckoutComponent},
  { path: 'dashboard', component: DashboardPage },
  { path: 'invoices', component: InvoicesComponent},
  {path:'user-orders', component:UserOrdersComponent}
];
