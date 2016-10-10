import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { Ng2BootstrapModule} from 'ng2-bootstrap';
import { UserWeight } from './userweight/userWeight.component';

import { IWeigher, IWeighing, Weighing } from './entities/Weigher';
import { WeighService } from './services/WeighService';
import { ToastsManager } from 'ng2-toastr';

import * as moment from 'moment';
import { RegisterComponent } from './account/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
     UserWeight,
     RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
    routing
  ],
  providers: [HttpModule, WeighService, ToastsManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
