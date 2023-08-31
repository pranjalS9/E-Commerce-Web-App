import { Component, OnInit } from '@angular/core';
import { IOrders } from '../../../models/IOrders';
import { ICart } from '../../../models/ICart';
import { CartService } from 'src/app/cart/CartServices/cart.service';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ){}
  
  totalItemsBuyArray: ICart[] = this.cartService.totalItemsOrdered;
  orderDataArray: IOrders[] = [];
  orderTotal: number = 0;

  ngOnInit(): void {
    for(let i=0; i<this.totalItemsBuyArray.length; i++){
      this.orderTotal += this.totalItemsBuyArray[i].price;
    }
    this.orderDataArray = [
      {
        id: this.generateRandomHash(12),
        date: new Date(),
        totalAmount: this.orderTotal,
        buyerName: 'Pranjal'
      }
    ]
  }

  generateRandomHash(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomHash = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomHash += characters.charAt(randomIndex);
    }
    return randomHash;
  }
}
