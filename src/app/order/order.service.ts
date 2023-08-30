import { Injectable } from '@angular/core';
import { ICart } from '../models/ICart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersArray!: ICart[];
  constructor() { }

  setOrders(orders: ICart[]): void{
    this.ordersArray = orders;
  }
  getOrders(): ICart[] {
    return this.ordersArray;
  }
}
