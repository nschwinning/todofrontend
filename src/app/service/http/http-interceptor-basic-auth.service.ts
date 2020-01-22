import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //let username = 'nils';
    //let password = 'nils';
    //let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);


    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();

    if (basicAuthHeaderString && username) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      })
    }

    return next.handle(req).pipe(
      catchError(
        error => {
          if (error.status == 401) {
            this.basicAuthenticationService.refreshJWTToken();
          }
          return EMPTY;

        }
      )
    );
  }

  constructor(private basicAuthenticationService: BasicAuthenticationService) { }
}
