import { Component, OnInit } from '@angular/core';
import {AppDataService} from '../services/app-data.service'
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  closeResult: string;
  tableData = [];
  detailData=[];
  show:boolean=false;
  eye:boolean=false;
  constructor(private _addDataService: AppDataService) { }

  ngOnInit(): void {
    this.getDataFromService();
  }
  getDataFromService(){
    this.tableData = this._addDataService.getData();
  }

  openNewForm() : void
  {
    var ele:HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "block";
  }

  close(){
    var ele:HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "none";
  }

  saveData(brand:string, name:string, deviceID:string, check1:string){
    this._addDataService.addData(
      {
        "name" : brand,
        "deviceid" : deviceID,
        "type" : check1,
        "assignedTo" : name,
        "status" : "Available"
        
      }
    );
    this.getDataFromService();
  }
   deleteRow(index){
    this.tableData.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(this.tableData)); 
}
cutAssigned(i)
{
  this.tableData[i].assignedTo='NA';
  localStorage.setItem('data', JSON.stringify(this.tableData)); 
}
changeShow()
{
  this.show=true;
}
// showDetails()
// {
//  this.eye=true;
// }
// openPopup(index)
// {
//   this.detailData=this.tableData[index];
// }
}
