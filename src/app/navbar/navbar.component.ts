import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import 'preline/plugin';
import { SharedDataService } from '../shared-data.service';
import { User } from '../Interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sharedInfo!: User
  user!: User
  ngOnInit() {
    if (localStorage.getItem('usr')) {
      let ue = localStorage.getItem('usr');
      this.user = JSON.parse(ue!);
    }
  }
  constructor(private router: Router) {
  }

  loggout() {
    localStorage.removeItem('usr')
    localStorage.removeItem('tkn')
    this.router.navigate(['/login'])
  }
}
