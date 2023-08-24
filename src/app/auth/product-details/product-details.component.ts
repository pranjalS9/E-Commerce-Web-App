import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data-service.service';
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
    private dataService: DataService
  ) {}

  currentRating = 3;
  maxRating = 5;
  productId: string | null = '';


  ngOnInit(): void {
    this.productSubscription = this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if(this.productId){
        this.dataService.getProductById(this.productId).subscribe(response => {
          this.product = response;
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe(); // Unsubscribe when component is destroyed
  }

  addToCart(){
    let isExistProduct: boolean = false;
    let existedProductId: number = 0;
    let cartArrayId: number = 0;
    for(let i=0; i<this.dataService.cartArray.length; i++){
      if(this.dataService.cartArray[i].id == this.product.id){
        isExistProduct = true;
        existedProductId = this.product.id;
        cartArrayId = i;
      }
    }
    if(isExistProduct == false){

      let itemQuantity = this.dataService.itemQuantity;
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
      
      this.dataService.cartArray.push(itemObj);
    }else{
      this.dataService.itemQuantity += 1;
      this.dataService.cartArray[cartArrayId].quantity += 1;
      
    }
  }
}
