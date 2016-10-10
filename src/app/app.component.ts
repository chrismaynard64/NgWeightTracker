import { Component } from '@angular/core';

import { OnInit } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  userName;


    ngOnInit() {
        if (localStorage.getItem('userName')) {
          this.userName = localStorage.getItem('userName');
        }
    }

}
