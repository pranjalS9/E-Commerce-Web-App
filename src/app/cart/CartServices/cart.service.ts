import { Injectable } from '@angular/core';
import { ICart } from '../../models/ICart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cartArray: ICart[] = [];
  // itemQuantity: number = 1;
  totalElementsInCart: number = 0;
  totalItemsOrdered: ICart[] = [];
  cartTotalPrice: number = 0;

  getCartTotalPrice(): number {
    for(let i=0; i<this.cartArray.length; i++){
      this.cartTotalPrice += (this.cartArray[i].price);
    }
    return this.cartTotalPrice;
  }

  getTotalCartItems(): number {
    for(let i=0; i<this.cartArray.length; i++){
      this.totalElementsInCart += this.cartArray[i].quantity;
    }
    return this.totalElementsInCart;
  }

  emptyCart(): void{
    this.cartArray.splice(0, this.cartArray.length);
  }

  deleteById(id: number){
    this.totalElementsInCart -= 1;
    this.cartTotalPrice -= (this.cartArray[id].price);
    this.cartArray.splice(id, 1);
  }
}
