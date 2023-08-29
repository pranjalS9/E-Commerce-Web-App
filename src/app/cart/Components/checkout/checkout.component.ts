import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../../../product/DataServices/data-service.service';
import { ICart } from '../../../models/ICart';
import { CartService } from 'src/app/cart/CartServices/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  totalItemsQuantityInCart: number = 0;

  constructor(
    public cartService: CartService
  ){}

  ngOnInit(): void {
    this.totalItemsQuantityInCart = this.getTotalQuantity();
  }

  getTotalQuantity(): number {
    for(let i=0; i<this.cartService.cartArray.length; i++){
      this.totalItemsQuantityInCart += this.cartService.cartArray[i].quantity;
    }
    return this.totalItemsQuantityInCart;
  }
}

