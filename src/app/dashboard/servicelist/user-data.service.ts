import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }
  addData(newData:{}){
    var data = [];
    if(localStorage.getItem('dataUser')){
      data = JSON.parse(localStorage.getItem("dataUser"));
    }
    data.push(newData);
    localStorage.setItem('dataUser',JSON.stringify(data));
  }

  getData(){
    return JSON.parse(localStorage.getItem("dataUser"));
  }
  
}
