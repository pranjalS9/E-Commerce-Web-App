import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../DataServices/data-service.service';
import { CartService } from 'src/app/cart/CartServices/cart.service';
import { IProduct } from '../../../models/IProduct';
import { Subscription } from 'rxjs';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { ICart } from '../../../models/ICart';

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

  productId: string | null = '';
  relatedProducts!: IProduct[];
  relatedProductCategory: string = '';
  totalItemsInCart: number = 0;
  cartArray: ICart[] = this.cartService.cartArray;


  ngOnInit(): void {
    this.productSubscription = this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if(this.productId){
        this.dataService.getProductById(this.productId).subscribe(response => {
          this.product = response;
          this.relatedProductCategory = this.product.category;
        })
      }
    });

    this.totalItemsInCart = this.getTotalElementsOfCart();
  }
  

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe(); 
  }

  getTotalElementsOfCart(): number {
    for(let i=0; i<this.cartArray.length; i++){
      this.totalItemsInCart += this.cartArray[i].quantity;
    }
    return this.totalItemsInCart;
  }

  addToCart(){
    let token = localStorage.getItem('token');
    if(token && token!==''){
      let isExistProduct: boolean = false;
      let existedProductId: number = 0;
      let cartArrayId: number = 0;

      this.totalItemsInCart += 1;

      for(let i=0; i<this.cartArray.length; i++){
        if(this.cartArray[i].id == this.product.id){
          isExistProduct = true;
          existedProductId = this.product.id;
          cartArrayId = i;
        }
      }
      if(isExistProduct == false){
        let itemObj: ICart = {
            id: this.product.id,
            title: this.product.title,
            price: this.product.price,
            category: this.product.category,
            image: this.product.image,
            description: this.product.description,
            rating: this.product.rating,
            quantity: 1
        }
        
        this.cartArray.push(itemObj);
      }else{
        this.cartArray[cartArrayId].quantity += 1;
        this.cartArray[cartArrayId].price += this.product.price;
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
