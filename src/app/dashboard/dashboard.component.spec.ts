/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import {Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';

import { DashboardComponent } from './Dashboard.component';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}


let comp:    DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;
let de:      DebugElement;
let el:      HTMLElement;

describe('Component: Dashboard', () => {


  let fixture;

beforeEach( async(() => {
  TestBed.configureTestingModule({
    declarations: [ DashboardComponent ],
    providers: [ Http, 
      { provide: Router,      useClass: RouterStub }
    ]
  })
  .compileComponents().then(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;
  });

}));


  it('should create an instance', () => {
    //let component = new DashboardComponent();
    expect(comp).toBeTruthy();


  });
});
