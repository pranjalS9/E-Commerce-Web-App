import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/CartServices/cart.service';
import { ICart } from '../models/ICart';
import { AuthService } from '../auth/AuthServices/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit{
  constructor(
    private route: Router,
    public cartService: CartService,
    public authService: AuthService
  ){}

  cartArray: ICart[] = this.cartService.getCart();
  showCartAnimation: boolean = false;
  totalItemsInCart: number = this.cartService.getItemsQuantityInCart();
  isLoggedIn: boolean = this.authService.isLoggedIn();

  ngOnInit(): void {

  }
  onLogout(): void{
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
