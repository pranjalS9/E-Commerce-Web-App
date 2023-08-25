import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { DataService } from '../../Services/DataServices/data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICart } from '../../models/ICart';
import { Router } from '@angular/router';
import { CartService } from 'src/app/auth/Services/CartServices/cart.service';

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
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService
  ){}

  productsArray: IProduct[] = [];
  selectedProducts: IProduct[] = [];
  currentCategory: string = '';
  totalItemsInCart: number = 0;
  cartArray: ICart[] = this.cartService.cartArray;


  ngOnInit(): void {
    this.dataService.getProducts().subscribe(
      res => {
        this.productsArray = res;
      }
    )
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required]
    })
    this.categoryForm.get('category')?.valueChanges.subscribe(value => {
      if (this.currentCategory !== value) {
        this.selectedProducts = [];
        this.currentCategory = value;
      }
      this.selectedProducts = this.selectedProducts.concat(
        this.productsArray.filter(prod => prod.category === value)
      );
      console.log(this.selectedProducts)
    })
  }

  getTotalElementsOfCart(): number {
    for(let i=0; i<this.cartArray.length; i++){
      this.totalItemsInCart += this.cartArray[i].quantity;
    }
    return this.totalItemsInCart;
  }

  // to dynamically set the form control value.
  changeCategory(e: any){
    this.currentCategory = e.target.value;
    this.category?.setValue(e.target.value, {
      onlySelf: true
    })
    
  }

  get category(){
    return this.categoryForm.get('category');
  }
  
  addToCart(product: IProduct){
    let token = localStorage.getItem('token');
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

        let itemQuantity = this.totalItemsInCart;
        let itemObj: ICart = {
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            image: product.image,
            description: product.description,
            rating: product.rating,
            quantity: itemQuantity
        }
        
        this.cartArray.push(itemObj);
      }else{
        this.cartArray[cartArrayId].quantity += 1;
      }
    }else{
      this.router.navigate(['/auth/login']);
    }
  }
  onSubmit(){

  }
}
