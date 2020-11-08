import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private key:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
   var tokenizedRequest = request.clone({
      setHeaders :{
        authKey:!this.key.isUserTokenValid() ? localStorage.getItem('user') : ''
      }
    })
    console.log(tokenizedRequest)
    return next.handle(tokenizedRequest);
                
  }
}





