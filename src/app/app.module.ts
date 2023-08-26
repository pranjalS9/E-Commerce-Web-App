import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select'

import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { MainHeaderComponent } from './auth/Components/main-header/main-header.component';
import { HomeComponent } from './product/Components/home/home.component';
import { ProductListComponent } from './product/Components/product-list/product-list.component';
import { ProductDetailsComponent } from './product/Components/product-details/product-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartComponent } from './cart/Components/cart/cart.component';
import { CheckoutComponent } from './cart/Components/checkout/checkout.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import { ShippingInfoComponent } from './payment/Components/shipping-info/shipping-info.component';
import { PaymentDetailsComponent } from './payment/Components/payment-details/payment-details.component';
import { OrderSummaryComponent } from './payment/Components/order-summary/order-summary.component';
import { OrdersComponent } from './order/Components/orders/orders.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { AdminHeaderComponent } from './Admin/admin-header/admin-header.component';
import { AdminProductsComponent } from './Admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './Admin/admin-users/admin-users.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainHeaderComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    ShippingInfoComponent,
    PaymentDetailsComponent,
    OrderSummaryComponent,
    OrdersComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    AdminProductsComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    MatButtonToggleModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
