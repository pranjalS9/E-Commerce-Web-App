import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './product/Components/home/home.component';
import { LoginComponent } from './auth/Components/login/login.component';
import { authGuard } from './auth/auth.guard';
import { ProductDetailsComponent } from './product/Components/product-details/product-details.component';
import { CartComponent } from './cart/Components/cart/cart.component';
import { CheckoutComponent } from './cart/Components/checkout/checkout.component';
import { PaymentDetailsComponent } from './payment/Components/payment-details/payment-details.component';
import { OrderSummaryComponent } from './payment/Components/order-summary/order-summary.component';
import { OrdersComponent } from './order/Components/orders/orders.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { AdminProductsComponent } from './Admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './Admin/admin-users/admin-users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin/home',
    component: AdminHomeComponent
  },
  {
    path: 'admin/home/products',
    component: AdminProductsComponent
  },
  {
    path: 'admin/home/users',
    component: AdminUsersComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard]
  },
  {
    path: 'payment-details',
    component: PaymentDetailsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'order-summary',
    component: OrderSummaryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
