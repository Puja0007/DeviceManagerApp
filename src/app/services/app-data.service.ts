import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor() { }
  addData(newData:{}){
    var data = [];
    if(localStorage.getItem('data')){
      data = JSON.parse(localStorage.getItem("data"));
    }
    data.push(newData);
    localStorage.setItem('data',JSON.stringify(data));
  }

  getData(){
    return JSON.parse(localStorage.getItem("data"));
  }
}
