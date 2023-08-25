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
}
