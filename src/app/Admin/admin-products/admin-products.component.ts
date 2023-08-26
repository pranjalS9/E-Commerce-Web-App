import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { AdminServicesService } from '../admin-services.service';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  productsArray!: IProduct[];

  constructor(private adminServices: AdminServicesService){}

  ngOnInit(): void {
    this.adminServices.getProducts().subscribe(response => {
      this.productsArray = response;
    })
  }

  onDelete(id: number): void {
    this.adminServices.deleteProduct(id).subscribe(response => {
      console.log(response);
    })
  }

}
