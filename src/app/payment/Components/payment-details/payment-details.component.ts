import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent {
  paymentForm: FormGroup;

  months: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  years: number[] = [2023, 2024, 2025, 2026, 2027]; 
  
  constructor(private formBuilder: FormBuilder) {
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['',[ Validators.required, Validators.minLength(12)]],
      nameOnCard: ['',[ Validators.required]],
      securityCode: ['',[ Validators.required,Validators.maxLength(3), Validators.minLength(3)]],
      expirationMonth: ['',[ Validators.required]],
      expirationYear: ['',[ Validators.required]]
    });
  }

  errorMessage!: string;
  isInvalidDetail!: boolean;

  isInvalid(field: string): string {
    if(field == 'cardNumber'){
      if(this.paymentForm.get(field)?.hasError('minlength') && this.paymentForm.get(field)?.touched){
        return `*Card Number must be at least 12 digits long`;
      }else if(this.paymentForm.get(field)?.hasError('required') && this.paymentForm.get(field)?.touched){
        return  '*Card Number is required';
      }
    }else if(field == 'securityCode'){
      if(this.paymentForm.get(field)?.hasError('minlength') && this.paymentForm.get(field)?.touched
      || this.paymentForm.get(field)?.hasError('maxlength') && this.paymentForm.get(field)?.touched){
        return '*CVV/CVC Number must be of 3 digits';
      }else if(this.paymentForm.get(field)?.hasError('required') && this.paymentForm.get(field)?.touched){
        return ' *CVV/CVC is required';
      }
    }else if(field == 'nameOnCard' && this.paymentForm.get(field)?.hasError('required') && this.paymentForm.get(field)?.touched){
      return '*Name is required';
    }else if(field == 'expirationMonth' && this.paymentForm.get(field)?.hasError('required') && this.paymentForm.get(field)?.touched){
      return '*Expiration Month is required';
    }else if(field == 'expirationYear' && this.paymentForm.get(field)?.hasError('required') && this.paymentForm.get(field)?.touched){
      return '*Expiration Year is required';
    }
    return '';
  }
}
