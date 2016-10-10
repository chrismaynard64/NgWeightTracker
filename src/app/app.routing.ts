import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }      from './home/home.component';
import { DashboardComponent }      from './dashboard/dashboard.component';
import { LoginComponent }      from './account/login/login.component';
import { UserWeight } from './userweight/userWeight.component';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
 {
    path: 'weighings',
    component:UserWeight
  },
 {
    path: 'login',
    component: LoginComponent
  },
 {
    path: '',
    component: HomeComponent
  },
 {
    path: '**',
    component: HomeComponent
  }
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
