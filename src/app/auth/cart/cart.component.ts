import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data-service.service';
import { IProduct } from '../models/IProduct';
import { ICart } from '../models/ICart';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private cartService: CartService
  ){}

  itemsInCartArray: ICart[] = this.cartService.cartArray;
  initialPrice: any = 0;
  cartTotal: number = 0;

  ngOnInit(): void {
    for(let i=0; i<this.itemsInCartArray.length; i++){
      this.cartTotal += this.itemsInCartArray[i].price;
    }
  }

  deselectAll(){
    this.cartService.cartArray.splice(0, this.cartService.cartArray.length);
    this.cartService.totalElementsInCart = 0;
  }

  incrementQuantity(id: number){
    this.dataService.getProductById(`${this.cartService.cartArray[id].id}`).subscribe(response => {
      if(response){
        console.log(response)
        this.initialPrice = response
        console.log(this.initialPrice)
        console.log(this.initialPrice.price)
        this.itemsInCartArray[id].quantity += 1;
        this.itemsInCartArray[id].price += this.initialPrice.price;
        this.cartTotal += this.initialPrice.price;
      }
    })
  }

  
  decrementQuantity(id: number){
    this.dataService.getProductById(`${this.cartService.cartArray[id].id}`).subscribe(response => {
      if(response){
        console.log(response)
        this.initialPrice = response
        console.log(this.initialPrice)
        console.log(this.initialPrice.price)
        if(this.itemsInCartArray[id].quantity > 1){
          this.itemsInCartArray[id].quantity -= 1;
        }else{
          this.itemsInCartArray.splice(id, 1);
        }
        this.itemsInCartArray[id].price -= this.initialPrice.price;
        this.cartTotal -= this.initialPrice.price;
      }
    })
  }

  onDeleteOne(id: number){
    this.cartService.cartArray.splice(id, 1);
    this.cartService.totalElementsInCart = this.cartService.totalElementsInCart - this.cartService.cartArray[id].quantity - 1;
  }
}
