import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data-service.service';
import { ICart } from '../models/ICart';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ){}

  cartTotal: number = 0;
  totalItemsToBuy: ICart[] = this.dataService.cartArray

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