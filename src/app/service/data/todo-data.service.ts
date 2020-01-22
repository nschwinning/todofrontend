import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../list-todos/list-todos.component';
import { TODO_API_URL } from 'src/app/app.constants';
import { BasicAuthenticationService } from '../../service/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient,
    private authService: BasicAuthenticationService
  ) { }

  retrieveAllTodos() {
    const username = this.authService.getAuthenticatedUser();
    return this.http.get<Todo[]>(`${TODO_API_URL}/user/${username}/todos`);
  }

  deleteTodo(id) {
    const username = this.authService.getAuthenticatedUser();
    return this.http.delete(`${TODO_API_URL}/user/${username}/todos/${id}`);
  }

  retrieveTodo(id) {
    const username = this.authService.getAuthenticatedUser();
    return this.http.get<Todo>(`${TODO_API_URL}/user/${username}/todos/${id}`); 
  }

  updateTodo(id, todo) {
    const username = this.authService.getAuthenticatedUser();
    return this.http.put(`${TODO_API_URL}/user/${username}/todos/${id}`, todo);
  }

  createTodo(todo) {
    const username = this.authService.getAuthenticatedUser();
    return this.http.post(`${TODO_API_URL}/user/${username}/todos`, todo);
  }
}
