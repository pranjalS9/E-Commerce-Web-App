import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/DataServices/data-service.service';
import { ICart } from '../../models/ICart';
import { CartService } from 'src/app/auth/Services/CartServices/cart.service';
import { IProduct } from '../../models/IProduct';

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
  productsArray: IProduct[] = [];
  initialPrice: any = 0;
  cartTotalPrice: number = 0;
  totalCartItems: number = 0;
  productTotalPrice: number = 0;

  ngOnInit(): void {
    this.getCartTotalPrice();
    this.getTotalCartItems();
  }

  getCartTotalPrice(): number {
    for(let i=0; i<this.itemsInCartArray.length; i++){
      this.cartTotalPrice += (this.itemsInCartArray[i].price)*(this.itemsInCartArray[i].quantity);
    }
    return this.cartTotalPrice;
  }

  getTotalCartItems(): number {
    for(let i=0; i<this.itemsInCartArray.length; i++){
      this.totalCartItems += this.itemsInCartArray[i].quantity;
    }
    return this.totalCartItems;
  }

  deselectAll(){
    this.cartService.cartArray.splice(0, this.cartService.cartArray.length);
    this.totalCartItems = 0;
    this.cartTotalPrice = 0;
  }

  incrementQuantity(id: number){
    this.dataService.getProductById(`${this.cartService.cartArray[id].id}`).subscribe(response => {
      if(response){
        this.initialPrice = response
        this.itemsInCartArray[id].quantity += 1;
        this.itemsInCartArray[id].price += this.initialPrice.price;
        this.cartTotalPrice += this.initialPrice.price;
        this.totalCartItems += 1;
      }
    })
  }

  
  decrementQuantity(id: number){
    this.dataService.getProductById(`${this.cartService.cartArray[id].id}`).subscribe(response => {
      if(response){
        this.initialPrice = response
        if(this.itemsInCartArray[id].quantity > 1){
          this.itemsInCartArray[id].quantity -= 1;
          this.totalCartItems -= 1;
        }else{
          this.itemsInCartArray.splice(id, 1);
        }
        this.itemsInCartArray[id].price -= this.initialPrice.price;
        this.cartTotalPrice -= this.initialPrice.price;
      }
    })
  }

  onDeleteOne(id: number){
    this.cartService.cartArray.splice(id, 1);
    this.cartService.totalElementsInCart = this.cartService.totalElementsInCart - this.cartService.cartArray[id].quantity - 1;
    this.totalCartItems -= 1;
    this.cartTotalPrice -= (this.cartService.cartArray[id].price)*(this.cartService.cartArray[id].quantity);
  }
}
