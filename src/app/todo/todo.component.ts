import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo : Todo
  id : number
  username = 'tichkames'

  constructor(
    private todoDataService : TodoDataService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']

    console.log('id: ' + this.id)

    this.todo = {
      description : '',
      targetDate : new Date(),
      done : false,
      id : this.id
    }

    if(this.id != -1){
      this.todoDataService.retriveTodo(this.username, this.id).subscribe(
        response => {
          this.todo = response
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  saveTodo(){
    if(this.id == -1){
      this.todoDataService.createTodo(this.username, this.todo).subscribe(
        response => {
          this.router.navigate(['todos'])
        },
        error => {
          console.log(error)
        }
      )
    } else {
      this.todoDataService.updateTodo(this.username, this.id, this.todo).subscribe(
        response => {
          this.todo = response
          this.router.navigate(['todos'])
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}
