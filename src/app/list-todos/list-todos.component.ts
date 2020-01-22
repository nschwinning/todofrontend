import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  message: string;

  todos: Todo[]; 

  constructor(private todoService: TodoDataService,
              private router: Router) { }

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos().subscribe(
      response => {
        this.todos=response;
      }
    );
  }

  deleteTodo(id) {
      this.todoService.deleteTodo(id).subscribe(
        response => {
          this.message=`Successfully deleted Todo with id ${id}`;
          this.refreshTodos();
        }
      )
  }

  updateTodo(id) {
    this.router.navigate(['todos', id]);
  }

  createTodo() {
    this.router.navigate(['todos', -1]);
  }

}

export class Todo {

  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) { }

}
