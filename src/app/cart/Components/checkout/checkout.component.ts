import { Component, OnInit } from '@angular/core';
import { ICart } from '../../../models/ICart';
import { CartService } from 'src/app/cart/CartServices/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  totalItemsQuantityInCart: number = 0;
  cartArray!: ICart[];

  constructor(
    public cartService: CartService
  ){}

  ngOnInit(): void {
    this.cartArray = this.cartService.getCart();
    this.totalItemsQuantityInCart = this.cartService.getItemsQuantityInCart();
  }
}

