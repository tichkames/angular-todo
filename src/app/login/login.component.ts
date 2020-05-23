import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'tichkames'
  password = 'tichkames'
  errorMessage = "Invalid Login"
  invalidLogin = false

  //Router
  //angular.giveMeRouter
  //dependency injection 
  constructor(
    private router : Router,
    private hardcodedAuthenticationService : HardcodedAuthenticationService,
    private basicAuthenticationService : BasicAuthenticationService) { }

  ngOnInit() {
  }

  handleLogin(){
    console.log(this.username)
    if(this.hardcodedAuthenticationService.authenticate(this.username,this.password)){
      this.invalidLogin = false
      this.router.navigate(['welcome', this.username])
    }else{
      this.invalidLogin = true
    }
  }

  handleBasicAuthLogin(){
		this.basicAuthenticationService.executeService(this.username, this.password)
		.subscribe(
			response => {
				console.log(response)
				this.router.navigate(['welcome', this.username])
				this.invalidLogin = false
			},
			error => {
				console.log(error)
				this.invalidLogin = true
			}
		)
  }
  
  handleJwtAuthLogin(){
		this.basicAuthenticationService.executeJwtService(this.username, this.password)
		.subscribe(
			response => {
				console.log(response)
				this.router.navigate(['welcome', this.username])
				this.invalidLogin = false
			},
			error => {
				console.log(error)
				this.invalidLogin = true
			}
		)
	}
}
