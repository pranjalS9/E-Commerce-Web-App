import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './auth/Components/home/home.component';
import { LoginComponent } from './auth/Components/login/login.component';
import { authGuard } from './auth/auth.guard';
import { ProductDetailsComponent } from './auth/Components/product-details/product-details.component';
import { CartComponent } from './auth/Components/cart/cart.component';
import { CheckoutComponent } from './auth/Components/checkout/checkout.component';
import { PaymentDetailsComponent } from './auth/Components/payment-details/payment-details.component';
import { OrderSummaryComponent } from './auth/Components/order-summary/order-summary.component';
import { OrdersComponent } from './auth/Components/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
