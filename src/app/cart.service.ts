import { Injectable } from '@angular/core';
import { ICart } from './auth/models/ICart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cartArray: ICart[] = [];
  itemQuantity: number = 1;
  totalElementsInCart: number = 0;

}
