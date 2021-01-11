import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  isLoggedIn()
  {
    if(localStorage.getItem('login'))
    {
      return true;
    }
  }
}
