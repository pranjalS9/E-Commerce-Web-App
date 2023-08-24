import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data-service.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {
  constructor(
    private route: Router,
    public dataService: DataService
  ){}

  onLogout(): void{
    localStorage.clear()
    this.route.navigate(['/auth/login'])
  }
}
