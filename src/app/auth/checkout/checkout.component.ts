import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../../data-service.service';
import { ICart } from '../models/ICart';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(
    public cartService: CartService
  ){}


  checkOutItems: ICart[] = this.cartService.cartArray
}

