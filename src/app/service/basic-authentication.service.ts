import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const AUTHENTICATED_USER = 'authenticatedUser'
export const AUTHENTICATED_TOKEN = 'authToken'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private httpClient : HttpClient) { }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem('authToken');
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(AUTHENTICATED_TOKEN);
  }

  executeService(username, password){

    let basicAuthHttpHeader = 'Basic ' + window.btoa(username + ':' + password)

    let headers = new HttpHeaders({
      Authorisation : basicAuthHttpHeader
    })

    return this.httpClient.get<AuthenticationBean>(`${API_URL}/basicauth`, 
      {headers})
      .pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username)
            sessionStorage.setItem(AUTHENTICATED_TOKEN, basicAuthHttpHeader)
            return data
          }
        )
      )
  }

  executeJwtService(username, password){

    return this.httpClient.post<any>(`${API_URL}/authenticate`, 
    {
      username,
      password
    })
      .pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username)
            sessionStorage.setItem(AUTHENTICATED_TOKEN, `Bearer ${data.token}`)
            return data
          }
        )
      )
  }
}

export class AuthenticationBean {
  constructor(public message : string){
  }
}
