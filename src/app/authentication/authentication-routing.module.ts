import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../login.guard';

import { AuthenticationComponent } from './authentication.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
{ 
  path: '', 
  pathMatch: 'full',
  redirectTo: 'signup'
  
  
 },

{
  path:'signin',
  component:SigninComponent,
  canActivate:[LoginGuard]
},
{
  path:'signup',
  component:SignupComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
