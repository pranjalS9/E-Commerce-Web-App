import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './auth/models/IProduct';
import { ICart } from './auth/models/ICart';
import { IOrders } from './auth/models/IOrders';
import { IUser } from './auth/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  productsUrl = 'https://fakestoreapi.com/products/';
  loginUrl = 'https://fakestoreapi.com/auth/login';
  // cartArray: ICart[] = [];
  // ordersArray: IOrders[] = []
  // itemQuantity: number = 1;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl);
  }
  getProductById(id: string): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productsUrl + id);
  }
  postUserToken(userData: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.loginUrl, userData, httpOptions);
  }
}

