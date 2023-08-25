import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../../data-service.service';
import { ICart } from '../models/ICart';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  checkOutItems: ICart[] = this.cartService.cartArray
  totalItemsInCart: number = 0;

  constructor(
    public cartService: CartService
  ){}

  ngOnInit(): void {
    this.totalItemsInCart = this.getTotalItems();
  }

  getTotalItems(): number {
    for(let i=0; i<this.checkOutItems.length; i++){
      this.totalItemsInCart += this.checkOutItems[i].quantity;
    }
    return this.totalItemsInCart;
  }
}

