import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private router: Router
  ) { }

  // loginUrl = 'https://fakestoreapi.com/auth/login';

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  // postUserToken(userData: string):Observable<any>{
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.post<any>(this.loginUrl, userData, httpOptions);
  // }
  
  // isAuthenticated(userData: string): boolean {
  //   let isValidUser = false;
  //   this.postUserToken(userData).subscribe(
  //     response => {
  //       console.log(response)
  //       localStorage.setItem('token', response.token);
  //       // localStorage.setItem('username', `${userData.username}`);
  //       this.router.navigate(['/']);
  //       isValidUser = true;
  //     }
  //   )
  //   return isValidUser;
  // }
}
