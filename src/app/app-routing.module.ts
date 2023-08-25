import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './auth/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { SigninComponent } from './auth/signin/signin.component';
import { ProductDetailsComponent } from './auth/product-details/product-details.component';
import { CartComponent } from './auth/cart/cart.component';
import { CheckoutComponent } from './auth/checkout/checkout.component';
import { PaymentDetailsComponent } from './auth/payment-details/payment-details.component';
import { OrderSummaryComponent } from './auth/order-summary/order-summary.component';
import { OrdersComponent } from './auth/orders/orders.component';

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
