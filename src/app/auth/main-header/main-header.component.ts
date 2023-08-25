import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data-service.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit{
  constructor(
    private route: Router,
    public dataService: DataService,
    public cartService: CartService
  ){}

  isLoggedIn: boolean = false;
  username: string | null = localStorage.getItem('username');
  cartLength: number = this.cartService.totalElementsInCart;
  showCartAnimation: boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem('token') && localStorage.getItem('token') !== ''){
      this.isLoggedIn = true
    }
  }
  goOrders(){
    if(this.isLoggedIn){
      this.route.navigate(['/orders']);
    }else{
      this.route.navigate(['/auth/login']);
    }
  }
  onLogout(): void{
    localStorage.clear()
    this.route.navigate(['/auth/login']);
  }
}
