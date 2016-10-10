import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private title = 'Home';

   private access_token = localStorage.getItem('access_token');
    private expires_in = localStorage.getItem('expires_in');
    private token_type = localStorage.getItem('token_type');
    private userName = localStorage.getItem('userName');  

  constructor() { }

  ngOnInit() {
  }

}
