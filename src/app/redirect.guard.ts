import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RedirectGuard implements CanActivate {
  constructor(private route:Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    { 
      if(localStorage.getItem('login'))
      {
        return true;
      }
    else{
      this.route.navigate(['/signin']);
        return false;
    }
  }
  
  
}
