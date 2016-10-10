/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { HttpModule, Http, Headers } from '@angular/http';
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

    declarations: [ LoginComponent ],
    providers: [ HttpModule, Http, 
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
