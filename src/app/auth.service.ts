import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isUserLoggedIn()
  {
    if(localStorage.getItem('login'))
    {
      return true;
    }
    else{
      return false;
    }
  }
}
