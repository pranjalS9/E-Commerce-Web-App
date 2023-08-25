import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/CartServices/cart.service';
import { ICart } from '../../../models/ICart';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit{
  constructor(
    private route: Router,
    public cartService: CartService
  ){}

  isLoggedIn: boolean = false;
  username: string | null = localStorage.getItem('username');
  cartArray: ICart[] = this.cartService.cartArray;
  showCartAnimation: boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem('token') && localStorage.getItem('token') !== ''){
      this.isLoggedIn = true
    }
  }
  getTotalItemsInCart(): number {
    let totalItems: number = 0;
    for(let i=0; i<this.cartArray.length; i++){
      totalItems += this.cartArray[i].quantity;
    }
    return totalItems;
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
