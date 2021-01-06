import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:'',redirectTo:'register', pathMatch: 'full' },
  {
    path:'login',
    component:  LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'devices',
    component:DevicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
