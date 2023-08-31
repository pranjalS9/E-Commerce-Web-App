import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor(private http: HttpClient) { }

  productsArray!: any;
  usersArray!: any;

  productsUrl = 'https://fakestoreapi.com/products';
  usersUrl = 'https://fakestoreapi.com/users';

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl);
  }
  addProduct(product: IProduct[]): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(this.productsUrl, product);
  }
  updateProduct(product: IProduct[]): Observable<IProduct[]> {
    return this.http.put<IProduct[]>(this.productsUrl, product);
  }
  deleteProduct(id: number): Observable<IProduct[]> {
    return this.http.delete<IProduct[]>(this.productsUrl + `/${id}`)
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl);
  }
  addUser(user: IUser[]): Observable<IUser[]> {
    return this.http.post<IUser[]>(this.usersUrl, user);
  }
  updateUser(user: IUser[]): Observable<IUser[]> {
    return this.http.put<IUser[]>(this.usersUrl, user);
  }
  deleteUser(id: number): Observable<IUser[]> {
    return this.http.delete<IUser[]>(this.usersUrl + `/${id}`)
  }
}
