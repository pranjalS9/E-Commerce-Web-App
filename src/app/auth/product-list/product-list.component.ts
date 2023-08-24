import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { DataService } from '../../data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  productsArray: IProduct[] = [];
  selectedProducts: IProduct[] = [];
  currentCategory: string = '';
  
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ){}


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
  
  onSubmit(){

  }
}
