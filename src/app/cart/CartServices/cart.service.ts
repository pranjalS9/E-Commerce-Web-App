import { Injectable } from '@angular/core';
import { ICart } from '../../models/ICart';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartArray: ICart[] = [];
  totalElementsInCart: number = 0;
  totalItemsOrdered: ICart[] = [];
  cartTotalPrice: number = 0;
  itemsQuantityInCartArray: number = 0;

  cartData = new Subject<ICart[]>();
  constructor() { }

  getCart():ICart[] {
    return this.cartArray;
  }
  getItemsQuantityInCart(): number {
    return this.cartArray.reduce((total, item) => total + item.quantity, 0);
  }
  getTotalCartItems(): number {
    return this.cartArray.length;
  }
  getCartTotalPrice(): number {
    let cartTotalPrice: number = 0;
    for(let i=0; i<this.cartArray.length; i++){
      cartTotalPrice += (this.cartArray[i].price);
    }
    return cartTotalPrice;
  }

  addCart(product: ICart){
    this.cartArray.push(product);
    this.cartData.next(this.cartArray);
  }

  incrementQuantity(id: number) {
    const item = this.cartArray[id];
    item.price += this.calculateInitialPrice(item);
    item.quantity += 1;
    this.cartData.next(this.cartArray);
    this.updateItemsQuantity();
  }

  decrementQuantity(id: number) {
    const item = this.cartArray[id];
    if (item.quantity > 1) {
      item.price -= this.calculateInitialPrice(item);
      item.quantity -= 1;
    } else {
      this.cartArray.splice(id, 1);
    }
    this.cartData.next(this.cartArray);
    this.updateItemsQuantity();
  }

  calculateInitialPrice(item: ICart): number {
    return item.price / item.quantity;
  }
  emptyCart(): void{
    this.cartArray.splice(0, this.cartArray.length);
  }

  deleteById(id: number){
    if (this.cartArray[id]) {
      const deletedItem = this.cartArray[id];
      this.cartArray.splice(id, 1);
      this.totalElementsInCart -= 1;
      this.cartTotalPrice -= deletedItem.price * deletedItem.quantity;
      this.cartData.next(this.cartArray);
      this.updateItemsQuantity();
    }
  }
  updateItemsQuantity() {
    this.itemsQuantityInCartArray = this.cartArray.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

}
