import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/IProduct';
import { DataService } from '../../DataServices/data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICart } from '../../../models/ICart';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/CartServices/cart.service';
import { AuthService } from 'src/app/auth/AuthServices/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  categoryForm!: FormGroup

  allCategories: string[] = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing"
  ] 

  // Initializations
  
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ){}

  productsArray: IProduct[] = [];
  selectedProducts: IProduct[] = [];
  currentCategory: string = '';
  totalItemsInCart: number = 0;
  initialPrice: number = 0;
  cartArray: ICart[] = this.cartService.getCart();


  ngOnInit(): void {
    this.dataService.getProducts().subscribe(
      res => {
        this.productsArray = res;
      }
    )
  }

  onSelectedCategory(category: string): void {
    this.selectedProducts = [];
    this.currentCategory = category;
  }
  getSelectedProducts(category: string): IProduct[] {
   
    this.selectedProducts = [];
    this.currentCategory = category;

    // if (this.currentCategory !== '') {
    //   this.dataService.getSelectedProducts(this.currentCategory).subscribe(
    //     (products: IProduct[]) => {
    //       this.selectedProducts = products;
    //     },
    //     (error: any) => {
    //       console.error('Error fetching products:', error);
    //     }
    //   );
    // }

    return this.selectedProducts;
  }

  // onValChange(event: Event) {
  //   style.
  // }
  
  addToCart(product: IProduct){
    let token = this.authService.getToken();
    if(token && token!==''){
      let isExistProduct: boolean = false;
      let cartArrayId: number = 0;

      this.totalItemsInCart += 1;

      for(let i=0; i<this.cartArray.length; i++){
        if(this.cartArray[i].id == product.id){
          isExistProduct = true;
          cartArrayId = i;
        }
      }
      if(isExistProduct == false){

        let itemObj: ICart = {
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            image: product.image,
            description: product.description,
            rating: product.rating,
            quantity: 1
        }
        this.cartService.addCart(itemObj);
        //this.cartArray.push(itemObj);
      }else{
        this.cartArray[cartArrayId].quantity += 1;
        this.cartArray[cartArrayId].price += product.price;
      }
    }else{
      this.router.navigate(['/auth/login']);
    }
  }
  onSubmit(){

  }
}
