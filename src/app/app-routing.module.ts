import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';


import { LoginGuard } from './login.guard';



import { RedirectGuard } from './redirect.guard';



const routes: Routes = [
 {
   path:'',
   redirectTo:'authentication',
   pathMatch:'full'

 },
//  {
//    path:'**',
//    component:DevicelistComponent,
//    canActivate:[RedirectGuard]
//  },
 

 
  
  
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
