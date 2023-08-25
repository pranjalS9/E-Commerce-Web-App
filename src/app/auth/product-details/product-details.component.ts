import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data-service.service';
import { CartService } from 'src/app/cart.service';
import { IProduct } from '../models/IProduct';
import { Subscription } from 'rxjs';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { ICart } from '../models/ICart';

defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any = [];
  private productSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private cartService: CartService
  ) {}

  currentRating = 3;
  maxRating = 5;
  productId: string | null = '';
  relatedProducts!: IProduct[];
  relatedProductCategory: string = '';


  ngOnInit(): void {
    this.productSubscription = this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if(this.productId){
        this.dataService.getProductById(this.productId).subscribe(response => {
          this.product = response;
          this.relatedProductCategory = this.product.category;
          console.log(this.relatedProductCategory)
        })
      }
    });
  }
  

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe(); // Unsubscribe when component is destroyed
  }

  addToCart(){
    let token = localStorage.getItem('token');
    if(token && token!==''){
      let isExistProduct: boolean = false;
      let existedProductId: number = 0;
      let cartArrayId: number = 0;

      this.cartService.totalElementsInCart += 1;

      for(let i=0; i<this.cartService.cartArray.length; i++){
        if(this.cartService.cartArray[i].id == this.product.id){
          isExistProduct = true;
          existedProductId = this.product.id;
          cartArrayId = i;
        }
      }
      if(isExistProduct == false){

        let itemQuantity = this.cartService.itemQuantity;
        let itemObj: ICart = {
            id: this.product.id,
            title: this.product.title,
            price: this.product.price,
            category: this.product.category,
            image: this.product.image,
            description: this.product.description,
            rating: this.product.rating,
            quantity: itemQuantity
        }
        
        this.cartService.cartArray.push(itemObj);
      }else{
        // this.cartService.itemQuantity += 1;
        this.cartService.cartArray[cartArrayId].quantity += 1;
        
      }
    }else{
      this.router.navigate(['/auth/login']);
    }
  }
  goCheckOut(){
    let token = localStorage.getItem('token');
    if(token && token!==''){
      this.router.navigate(['/checkout']);
    }else{
      this.router.navigate(['/auth/login']);
    }
  }
}
