import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/auth/models/IUser';
import { Output } from '@angular/core'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup
  users: IUser[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router

  ) {}
  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void{
    if(this.signinForm.valid && this.signinForm.value.password == this.signinForm.value.confirmPassword){
      this.users.push(
        {
          username: this.signinForm.value.username, 
          password: this.signinForm.value.password
        }
      )
      console.log(this.users)
      this.router.navigate(['/login']);
    }else{
      console.log('signin failed')
    }
    // this.http.post('http://localhost:4200/api/register', this.signinForm.getRawValue())
    // .subscribe(res => {
    //   console.log(res)
    // })
    
  }
}
