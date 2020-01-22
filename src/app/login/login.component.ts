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

  username='nils';
  password='';
  errorMessage='Invalid Credentials';
  invalidCredentials=false;

  constructor(private router: Router, private authenticationService: HardcodedAuthenticationService, private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit() {
  }

  onLogin() :void {
    console.log(this.username);
    if (this.authenticationService.authenticate(this.username, this.password)){
      this.invalidCredentials=false;
      this.router.navigate(['welcome', this.username]);
    }
    else {
      this.invalidCredentials=true;
    }
    
  }

  onBasicLogin() :void {
    console.log(this.username);
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
      .subscribe(
          data => {
              console.log(data);
              this.router.navigate(['welcome', this.username]);
              this.invalidCredentials=false;
          },
          error => {
              console.log(error);
              this.invalidCredentials=true;
          }
      )
    
  }

  onJWTLogin() :void {
    console.log(this.username);
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
          data => {
              console.log(data);
              this.router.navigate(['welcome', this.username]);
              this.invalidCredentials=false;
          },
          error => {
              console.log(error);
              this.invalidCredentials=true;
          }
      )
    
  }

}
