import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo{
  constructor(
    public id : number,
    public description : string,
    public targetDate : Date,
    public done : boolean
  ){
  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  username = 'tichkames'
  todos : Todo[]
  requestFail = false
  message : string

  constructor(
    private todoDataService : TodoDataService,
    private router : Router) { }

  ngOnInit() {
    this.refreshTodos()
  }

  deleteTodo(id){
    this.todoDataService.deleteTodo(this.username, id).subscribe(
      response => {
        this.refreshTodos()
      },
      error => {
        console.log(error)
        this.message = 'Failed to delete'
        this.requestFail = true
      }
    )
  }

  refreshTodos(){
    this.todoDataService.retriveAllTodos(this.username).subscribe(
      response => {
        this.todos = response
      },
      error => {
        this.message = 'Failed to refresh todos'
        this.requestFail = true
      }
    )
  }

  updateTodo(id){
    this.router.navigate(['todos', id])
  }

  createTodo(){
    this.router.navigate(['todos', -1])
  }
}
