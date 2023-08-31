import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../AuthServices/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  userData: string = '';
  isInvalidUser: boolean = false;

  adminDetails = {
    username: 'johnd',
    password: 'm38rmF$'
  }
  constructor(
    private authService: AuthService,
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
    if (loginForm.valid) {
      const username = loginForm.value.username;
      const password = loginForm.value.password;

      this.authService.login(username, password).subscribe({
        next: response => {
          if (username === this.adminDetails.username && password === this.adminDetails.password) {
            this.router.navigate(['/admin/home']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: error => {
          this.isInvalidUser = true;
        }}
      );
    }
  }
}
// "username":"donero","password":"ewedon"