import { Component, OnInit } from '@angular/core';
import { ICart } from '../../models/ICart';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from 'src/app/auth/Services/CartServices/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  constructor(
    private cartService: CartService,
    public dialog: MatDialog
  ){}

  cartTotal: number = 0;
  totalItemsToBuy: ICart[] = this.cartService.cartArray

  ngOnInit(): void {
    for(let i=0; i<this.totalItemsToBuy.length; i++){
      this.cartTotal += this.totalItemsToBuy[i].price;
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['./order-summary.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}