import { Injectable } from '@angular/core';
import { ICart } from './auth/models/ICart';
import { IOrders } from './auth/models/IOrders';
import { Observable } from 'rxjs';
import { ICartData } from './auth/models/ICartData';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // cartUrl = 'https://fakestoreapi.com/carts'

  cartArray: ICart[] = [];
  ordersArray: IOrders[] = []
  itemQuantity: number = 1;

  totalElementsInCart: number = 0;

  // getAllCarts(id: string): Observable<any> {
  //   return this.http.get<any>(this.cartUrl + id)
  // }
  // deleteCartItemById(id: string): Observable<ICartData[]> {
  //   return this.http.delete<ICartData[]>(this.cartUrl + id);
  // }
}
