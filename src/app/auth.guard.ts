import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService:AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      if(this.authService.isUserLoggedIn())
      {
    return true;
      }
      else{
        return false;
      }
   }
  //  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   const isLoggedIn = false; // ... your login logic here
  //   if (isLoggedIn) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }
}
