import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor(private http: HttpClient) { }

  productsUrl = 'https://fakestoreapi.com/products';

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl);
  }
  addProduct(product: IProduct): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(this.productsUrl, product);
  }
  updateProduct(product: IProduct[]): Observable<IProduct[]> {
    return this.http.put<IProduct[]>(this.productsUrl, product);
  }
  deleteProduct(id: number): Observable<IProduct[]> {
    return this.http.delete<IProduct[]>(this.productsUrl)
  }
}
