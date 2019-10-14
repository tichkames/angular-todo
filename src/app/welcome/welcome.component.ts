import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private passedParam = ''
  private serverMessage

  constructor(
    private route : ActivatedRoute,
    private welcomeDataService : WelcomeDataService) { }

  ngOnInit() {
    this.passedParam = this.route.snapshot.params['name']
  }

  getWelcomeMessage(){
    this.welcomeDataService.executeHelloWorldBeanService(this.passedParam).subscribe(
      response => this.handleSuccessResponse(response),
      error => this.handleErrorResponse(error)
    )
  }

  handleSuccessResponse(response){
    this.serverMessage = response.message
  }

  handleErrorResponse(response){
    console.log(response)
    this.serverMessage = response.message
  }
}
