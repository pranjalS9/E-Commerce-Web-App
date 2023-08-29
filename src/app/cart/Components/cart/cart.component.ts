import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../product/DataServices/data-service.service';
import { ICart } from '../../../models/ICart';
import { CartService } from 'src/app/cart/CartServices/cart.service';
import { IProduct } from '../../../models/IProduct';

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

  itemsQuantityInCartArray: number = 0;
  itemsInCartArray: ICart[] = this.cartService.cartArray;
  productsArray: IProduct[] = [];
  initialPrice: any = 0;
  cartTotalPrice: number = 0;
  totalCartItems: number = 0;
  productTotalPrice: number = 0;

  ngOnInit(): void {
    this.cartTotalPrice = this.cartService.getCartTotalPrice();
    this.totalCartItems = this.cartService.getTotalCartItems();
    this.getTotalQuantity();
    // this.getCartTotalPrice();
    // this.getTotalCartItems();
  }

  // getCartTotalPrice(): number {
  //   for(let i=0; i<this.itemsInCartArray.length; i++){
  //     this.cartTotalPrice += (this.itemsInCartArray[i].price);
  //   }
  //   return this.cartTotalPrice;
  // }

  // getTotalCartItems(): number {
  //   for(let i=0; i<this.itemsInCartArray.length; i++){
  //     this.totalCartItems += this.itemsInCartArray[i].quantity;
  //   }
  //   return this.totalCartItems;
  // }

  getTotalQuantity(): number {
    for(let i=0; i<this.cartService.cartArray.length; i++){
      this.itemsQuantityInCartArray += this.cartService.cartArray[i].quantity;
    }
    return this.itemsQuantityInCartArray;
  }

  deselectAll(){
    // this.cartService.cartArray.splice(0, this.cartService.cartArray.length);
    this.cartService.emptyCart();
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
    this.totalCartItems -= 1;
    this.cartTotalPrice -= (this.cartService.cartArray[id].price);
    this.cartService.cartArray.splice(id, 1);
  }
}
