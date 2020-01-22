import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGardService } from './service/route-gard.service';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGardService]},
  {path: 'todos', component: ListTodosComponent, canActivate: [RouteGardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGardService]},
  {path: 'todos/:id', component: TodoComponent, canActivate: [RouteGardService]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
