import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IErrorMessage } from 'src/app/auth/models/IErrorMessages';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data-service.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  errorMessage: IErrorMessage = {
    usernameError: '',
    passwordError: ''
  }
  userData: string = '';

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(loginForm: FormGroup){
    if(loginForm.valid){
      this.userData = JSON.stringify({
        username: `${loginForm.value.username}`,
        password: `${loginForm.value.password}`
      })
      this.dataService.postUserToken(this.userData).subscribe(
        response => {
          console.log(response)
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', `${loginForm.value.username}`);
          this.router.navigate(['/']);
        },
        error => {
          console.log("Username or password is invalid")
        }
      )
    }
  }
}
// "username":"donero","password":"ewedon"