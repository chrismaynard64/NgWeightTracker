/* tslint:disable:no-unused-variable */

import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { HttpModule, Http, Headers, ConnectionBackend } from '@angular/http';
import {Router} from '@angular/router';

import { LoginComponent } from './login.component';


class RouterStub {
  navigateByUrl(url: string) { return url; }
}

let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

let comp:    LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let de:      DebugElement;
let el:      HTMLElement;

describe('Component: Login', () => {
    
beforeEach( async(() => {
  TestBed.configureTestingModule({
    imports: [ HttpModule ], 
    declarations: [ LoginComponent ],
    providers: [ Http, ConnectionBackend, 
      { provide: Router,      useClass: RouterStub }
    ]
  })
  .compileComponents().then(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;  
  });

}));
    

  it('should create an instance', () => {
    //let component = new LoginComponent();
    expect(comp).toBeTruthy();
  

  });
});



/*
import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { HttpModule, Http, RequestOptions, ConnectionBackend, RequestOptionsArgs, Headers } from '@angular/http';
import {Router} from '@angular/router';

import { AppModule } from '../../';
import { LoginComponent } from './login.component';


class RouterStub {
  navigateByUrl(url: string) { return url; }
}

let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

class MyRequestOptions extends RequestOptions  {
  constructor(requestOptionsArgs: RequestOptionsArgs = { headers: headers }) {
    super(requestOptionsArgs);
  }
}


let comp:    LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let de:      DebugElement;
let el:      HTMLElement;

describe('Component: Login', () => {
    
beforeEach( async(() => {
  TestBed.configureTestingModule({

    declarations: [ LoginComponent ],
    providers: [  Http, RequestOptions, ConnectionBackend, 
      { provide: Router,      useClass: RouterStub },
      { provide: RequestOptions, use: MyRequestOptions }
    ]
  })
  .compileComponents().then(() => {
    //fixture = TestBed.createComponent(LoginComponent);
    //comp = fixture.componentInstance;  
  });

}));
    

  it('should create an instance', () => {
    //let component = new LoginComponent();
    //expect(comp).toBeTruthy();
  

  });
});

*/
