import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor{

  constructor(
    private basicAuthenticationService : BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let authHeaderString = this.basicAuthenticationService.getAuthenticatedToken()
    let username = this.basicAuthenticationService.getAuthenticatedUser()

    if(authHeaderString && username){
      request = request.clone({
        setHeaders : {
          Authorization : authHeaderString
        }
      })
    }
    
    return next.handle(request)
  }
}
