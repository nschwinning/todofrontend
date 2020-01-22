import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TODO_API_URL } from '../app.constants';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username: string, password: string) {
    

    return this.http.post<any>(`${TODO_API_URL}/authenticate`,
    {
      username,
      password
    }
    ).pipe(
        map(
           data => {
              sessionStorage.setItem(AUTHENTICATED_USER, username);
              sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
              return data;
           }
        )
    );
  }

  refreshJWTToken() {
    return this.http.get<any>(`${TODO_API_URL}/refresh`).pipe(
      map(
        data => {
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
        }
      )
    );
  }

  executeAuthenticationService(username: string, password: string) {
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader(username, password);

    let headers = new HttpHeaders({
        Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(`${TODO_API_URL}/basicauth`, {headers}).pipe(
        map(
           data => {
              sessionStorage.setItem(AUTHENTICATED_USER, username);
              sessionStorage.setItem(TOKEN, basicAuthHeaderString);
              return data;
           }
        )
    );
  }

  createBasicAuthenticationHttpHeader(username: string, password: string) {
      let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

      return basicAuthHeaderString;
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken(){
    if (this.getAuthenticatedUser)
      return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

export class AuthenticationBean {
  constructor() {}
}
