import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data-service.service';
import { IOrders } from '../models/IOrders';
import { ICart } from '../models/ICart';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private cartService: CartService
  ){}
  
  totalItemsBuyArray: ICart[] = this.cartService.cartArray
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
