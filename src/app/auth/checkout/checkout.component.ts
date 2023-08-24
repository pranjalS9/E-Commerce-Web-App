import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../../data-service.service';
import { ICart } from '../models/ICart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(
    private dataService: DataService
  ){}


  checkOutItems: ICart[] = this.dataService.cartArray
}

