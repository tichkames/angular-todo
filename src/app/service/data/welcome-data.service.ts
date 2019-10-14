import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class HelloServiceBean {
  constructor(
    public message : string
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private httpClient:HttpClient
  ) { }

  executeHelloWorldBeanService(message){
    return this.httpClient.get<HelloServiceBean>(`${API_URL}/hello-world-bean/${message}`)
  }
}
