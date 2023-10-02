import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carousel, Dropdown, initFlowbite } from 'flowbite';
import { AuthServiceService } from './services/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BreukhComputerFront';
  isLoginPage!: boolean;
  user: any
  url!: string
  login !: boolean
  ngOnInit() {
    initFlowbite();
    this.user = localStorage.getItem('usr');
    console.log(this.isLoginPage);
  }
  constructor(private router: ActivatedRoute, public roter: Router) {
  }

  addItem() {
  }
}



