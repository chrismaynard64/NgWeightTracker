import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private title = 'Login';
  private serviceBase = 'http://localhost:55446/';

  constructor(private _router: Router,  private _http: Http) { }

  ngOnInit() {
  }

   login(event, username, password) {
        event.preventDefault();
         
        let url = this.serviceBase + "token";
        let body = "username=" + username + "&password=" + password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });        
         
        this._http.post(url, body, options).subscribe(
            response => {
                localStorage.setItem('access_token', response.json().access_token);
                localStorage.setItem('expires_in', response.json().expires_in);
                localStorage.setItem('token_type', response.json().token_type);
                localStorage.setItem('userName', response.json().userName);
                this._router.navigate(['dashboard']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    } 

}
