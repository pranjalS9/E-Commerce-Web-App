import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  productsUrl = 'https://fakestoreapi.com/products/';
  loginUrl = 'https://fakestoreapi.com/auth/login';

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

