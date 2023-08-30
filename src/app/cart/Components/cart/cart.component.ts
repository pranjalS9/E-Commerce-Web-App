import { Component, OnInit } from '@angular/core';
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
    private cartService: CartService
  ){}

  itemsQuantityInCartArray: number = 0;
  itemsInCartArray!: ICart[];
  productsArray: IProduct[] = [];
  initialPrice: any = 0;
  cartTotalPrice: number = 0;
  totalCartItems: number = 0;
  productTotalPrice: number = 0;
  cartArray!: ICart[];

  ngOnInit(): void {
    this.cartService.cartData.subscribe((updatedCartArray: ICart[]) => {
      this.itemsInCartArray = updatedCartArray;
      this.totalCartItems = this.cartService.getItemsQuantityInCart();
      this.cartTotalPrice = this.cartService.getCartTotalPrice();
    });
  
    this.itemsInCartArray = this.cartService.getCart();
    this.totalCartItems = this.cartService.getItemsQuantityInCart();
    this.cartTotalPrice = this.cartService.getCartTotalPrice();
    }

  deselectAll(){
    this.cartService.emptyCart();
    this.totalCartItems = 0;
    this.cartTotalPrice = 0;
  }

  incrementQuantity(id: number) {
    this.cartService.incrementQuantity(id);
  }

  decrementQuantity(id: number) {
    this.cartService.decrementQuantity(id);
  }

  onDeleteOne(id: number){
    this.cartService.deleteById(id);
  }
}
