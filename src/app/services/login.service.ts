import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  registerData:any;

  public jwt: JwtHelperService = new JwtHelperService();
  apiURL = 'https://fathomless-bayou-20023.herokuapp.com' || 'http://localhost:4000'
 // apiURL = 'http://localhost:4000'
   
   token = localStorage.getItem('user')
  constructor(private http:HttpClient ) { }

  register(){
    return this.http.post(this.apiURL+'/register',this.registerData)
  }
  login(){
    return this.http.post(this.apiURL+'/login',this.registerData)
  }
  adminLogin(){
    
    return this.http.post(this.apiURL+'/adminLogin',this.registerData)
  }
  isLoggedIn(){
    return (localStorage.getItem('admin'))
  }

  isTokenValid(){
    let token = localStorage.getItem('admin')
    console.log(token)
    console.log(this.jwt.getTokenExpirationDate(token))
    console.log(this.jwt.isTokenExpired(token))
    return this.jwt.isTokenExpired(token)
  }
  isUserTokenValid(){
    let token = localStorage.getItem('user')
    return this.jwt.isTokenExpired(token)
  }
  
}
