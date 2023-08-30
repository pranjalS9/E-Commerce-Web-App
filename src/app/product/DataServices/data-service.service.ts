import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/IProduct';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  productsUrl = environment.productsUrl;
  loginUrl = environment.loginUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl);
  }
  getProductById(id: string): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productsUrl + id);
  }
  getSelectedProducts(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl + category);
  }
}

