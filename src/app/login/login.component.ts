import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Root } from 'src/Resons';
import { Login, LoginData, User } from '../Interface';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AuthServiceService, private fb: FormBuilder, private router: Router, private sharedDataService: SharedDataService, private tes: AuthServiceService) {
  }

  @Output() userEmitted = new EventEmitter<User>();
  errorLogin: boolean = false;
  userLogged!: User
  //loginForm!: FormGroup;

  lgn: boolean = false;

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(2)]]
  })
  isActive: boolean = true;
  get login() { return this.loginForm.get('login'); }

  get password() { return this.loginForm.get('password'); }

  user() {
    this.auth.search<Login>(this.loginForm.value).subscribe({
      next: x => {
        console.log(x);

        if (x.code === 200) {
          this.userLogged = x.data.user
          this.sharedDataService.setSharedInfo(this.userLogged);
          localStorage.setItem('tkn', x.data.token);
          this.router.navigate(['/accueil'])
          localStorage.setItem('usr', JSON.stringify(x.data.user));
          this.lgn = true
          //  console.log(this.tes.lgn);
        }
        else {
          this.errorLogin = true;
          setTimeout(() => {
            this.errorLogin = false;
          }, 5000);
        }
      }
    })
  }



}
