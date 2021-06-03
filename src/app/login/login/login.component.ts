import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signup: string = 'Login';
  message: any;
  users: any;
  loggedIn: boolean;
  clicked: boolean = false;
  //managehide:boolean=true;          
  constructor(private route: ActivatedRoute, private login: LoginService, private router: Router,
    private location: Location, private authService: AuthService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => { if (params.text) { this.signup = params.text } });
    this.authService.authState.subscribe((user) => {
      console.log(user)
      this.users = user;
      this.loggedIn = (user != null);
    });
  }

  credentials = new FormGroup({
    uname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  onClick() {
    if (this.signup == 'Sign Up') {
      if (this.credentials.status == 'INVALID') {
        this.message = 'Please Enter Username & Password'
      }
      else {
        this.clicked = true;
        this.login.registerData = this.credentials.value;
        console.log(this.credentials)
        this.login.register().subscribe((res: any) => {
          this.message = res;
          this.clicked = false;
          console.log(res)
        })
      }
    }
    if (this.signup == 'Login') {
      if (this.credentials.status == 'INVALID') {
        this.message = 'Please Enter Username & Password'
      }
      else {
        this.clicked = true
        this.login.registerData = this.credentials.value;
        this.login.login().subscribe((res: any) => {
          if (res) {
            this.clicked =  false
            localStorage.setItem('user', res[1]);
            localStorage.setItem('username', res[0])
            this.location.back();
          }
          else {
            this.message = 'Please check Username and password';
            console.log(this.message)
          }
        })
      }

    }
    if (this.signup == 'Admin Login') {
      if (this.credentials.status == 'INVALID') {
        this.message = 'Please Enter Username & Password'
      }
      else {
        this.clicked = true
        this.login.registerData = this.credentials.value;
        this.login.adminLogin().subscribe((res: any) => {
          this.message = res;
          this.clicked = false
          console.log(this.message)
          localStorage.setItem('admin', res)
          this.router.navigateByUrl('/manage')

        })
      }
    }
  }
  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      console.log(user)
      this.users = user;
      this.loggedIn = (user != null);
    });
  }
  signOut(): void {
    this.authService.signOut();
  }
}
