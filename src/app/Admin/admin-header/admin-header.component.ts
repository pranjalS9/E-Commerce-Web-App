import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  constructor(private route: Router){}

  username: string | null = localStorage.getItem('username');

  ngOnInit(): void {
    
  }
  
  onLogout(): void{
    localStorage.clear()
    this.route.navigate(['/auth/login']);
  }
}
