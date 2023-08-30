import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private router: Router
  ) { }

  loginUrl = environment.loginUrl;

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  login(username: string, password: string): Observable<any> {
    const userData = JSON.stringify({
      username: username,
      password: password
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.loginUrl, userData, httpOptions).pipe(
      map(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', username);
        return response;
      })
    );
  }
  logout(): void {
    localStorage.clear();
  }
  
  isLoggedIn(): boolean {
    if(localStorage.getItem('token') && localStorage.getItem('token') !== ''){
      return true;
    }else{
      return false;
    }
  }
  getUsername(): string | null{
    if(this.isLoggedIn()){
      return localStorage.getItem('username');
    }
    else {
      return '';
    };
  }
}
