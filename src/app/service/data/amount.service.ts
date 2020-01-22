import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Amount } from '../../domain/amount';
import { TODO_API_URL } from 'src/app/app.constants';
import { BasicAuthenticationService } from '../../service/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AmountService {

  constructor(
    private http: HttpClient,
    private authService: BasicAuthenticationService
  ) { }

  retrieveAllAmounts() {
    const username = this.authService.getAuthenticatedUser();
    return this.http.get<Amount[]>(`${TODO_API_URL}/user/${username}/amounts`);
  }  

  retrieveAmount(id) {
    const username = this.authService.getAuthenticatedUser();
    return this.http.get<Amount>(`${TODO_API_URL}/user/${username}/amounts/${id}`); 
  }

  createTodo(amount) {
    const username = this.authService.getAuthenticatedUser();
    return this.http.post(`${TODO_API_URL}/user/${username}/amounts`, amount);
  }

}
