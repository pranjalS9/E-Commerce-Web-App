import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ICart } from '../../../models/ICart';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DialogData } from '../../../models/IDialogData';
import { CartService } from 'src/app/cart/CartServices/cart.service';


@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit {
  
  formGroup!: FormGroup;

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      agreeCheckbox: [false]
    });
  }
  checkOutItems: ICart[] = this.cartService.getCart()

  shippingInfoArray: DialogData = {
    name: '',
    email: '',
    phone: 91,
    address: '',
    city: '',
    state: '',
    pincode: 0
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        name: this.shippingInfoArray.name,
        email: this.shippingInfoArray.email,
        phone: this.shippingInfoArray.phone,
        address: this.shippingInfoArray.address,
        city: this.shippingInfoArray.city,
        state: this.shippingInfoArray.city,
        pincode: this.shippingInfoArray.pincode
      },
    });


    dialogRef.afterClosed().subscribe(result => {
      this.shippingInfoArray = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-box.html',
  styleUrls: ['./shipping-info.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    ReactiveFormsModule
  ],
})
export class DialogOverviewExampleDialog {

  shippingForm! :  FormGroup

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.shippingForm = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      contactNumber: [this.data.phone, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: [this.data.address, Validators.required],
      city: [this.data.city, Validators.required],
      state: [this.data.state, Validators.required],
      pincode: [this.data.pincode, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
    
  }

  isInvalid(field: string): string {
    if(field == 'contactNumber'){
      if(this.shippingForm.get(field)?.hasError('pattern') && this.shippingForm.get(field)?.touched){
        return `Invalid contact number format`;
      }else if(this.shippingForm.get(field)?.hasError('required') && this.shippingForm.get(field)?.touched){
        return  '*Contact number is required';
      }
    }else if(field == 'email'){
      if(this.shippingForm.get(field)?.hasError('email') && this.shippingForm.get(field)?.touched){
        return '*Invalid email format';
      }else if(this.shippingForm.get(field)?.hasError('required') && this.shippingForm.get(field)?.touched){
        return ' *Email is required';
      }
    }else if(field == 'pincode'){
      if(this.shippingForm.get(field)?.hasError('pattern') && this.shippingForm.get(field)?.touched){
        return '*Pincode must be a 6-digit number';
      }else if(this.shippingForm.get(field)?.hasError('required') && this.shippingForm.get(field)?.touched){
        return ' *Pincode is required';
      }
    }else if(field == 'name' && this.shippingForm.get(field)?.hasError('required') && this.shippingForm.get(field)?.touched){
      return '*Name is required';
    }else if(field == 'address' && this.shippingForm.get(field)?.hasError('required') && this.shippingForm.get(field)?.touched){
      return '*Address Month is required';
    }else if(field == 'city' && this.shippingForm.get(field)?.hasError('required') && this.shippingForm.get(field)?.touched){
      return '*City is required';
    }else if(field == 'state' && this.shippingForm.get(field)?.hasError('required') && this.shippingForm.get(field)?.touched){
      return '*State is required';
    }
    return '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
