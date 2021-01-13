import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AppDataService } from '../servicelist/app-data.service';

@Component({
  selector: 'app-devicelist',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.css']
})
export class DevicelistComponent implements OnInit {
  closeResult: string;
  tableData = [];
  show:boolean=false;
  eye:boolean=false;
  num:number;
  
  showData=[];
  showSingleDetails=[];
  showModal = false;
  addDataModal = false;

  // deviceData = 
  deviceData = new FormGroup({
    name : new FormControl(''),
    brand : new FormControl(''),
    device : new FormControl(''),
    type : new FormControl(''),
    OS : new FormControl(''),
    ram : new FormControl(''),
    memory : new FormControl(''),
    imei : new FormControl(''),
  });

  constructor(private _addDataService: AppDataService,private route:Router) { }

  ngOnInit(): void {
    this.getDataFromService();
    
    
  }
  getDataFromService(){
    this.tableData = this._addDataService.getData();
    
    // console.log(this.showData);
    
  }
getDetaisData()
{
  this.showData = this._addDataService.getData();
  
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

  saveData(data){
    this._addDataService.addData(data);
    this.getDataFromService();
  }
  deleteRow(index){
    this.tableData.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(this.tableData)); 
}
cutAssigned(i)
{
  this.tableData[i].name='NA';
  localStorage.setItem('data', JSON.stringify(this.tableData)); 
}
changeShow()
{
  this.show=true;
}


editModel(i){
  var ele:HTMLElement = document.getElementById("edit-data") as HTMLElement;
  ele.style.display = "block";
  this.num=i;
  this.deviceData = new FormGroup({
    name : new FormControl(this.tableData[i].name),
    brand : new FormControl(this.tableData[i].brand),
    device : new FormControl(this.tableData[i].device),
    type : new FormControl(this.tableData[i].type),
    OS : new FormControl(this.tableData[i].OS),
    ram : new FormControl(this.tableData[i].ram),
    memory : new FormControl(this.tableData[i].memory),
    imei : new FormControl(this.tableData[i].imei),
  });

  // this.editDeviceData
}

closeEdit(){
  var ele:HTMLElement = document.getElementById("edit-data") as HTMLElement;
  ele.style.display = "none";
}

  showDetails(i)
  {
   this.showData=[
     {
       device: this.tableData[i].device,
       OS:this.tableData[i].OS,
       memory:this.tableData[i].memory,
       imei:this.tableData[i].imei,
       ram:this.tableData[i].ram,
       brand:this.tableData[i].brand,
       type:this.tableData[i].type

     }
   ]
}

// closeShowModel(){
//   var ele:HTMLElement = document.getElementById("show-model-data") as HTMLElement;
//   ele.style.display = "none";
// }

editData(data){
  // this._addDataService.addData(data);
  // this.getDataFromService();

  // this.deviceData.setValue(data);
}

onSubmit()
{
  this.tableData[this.num]=this.deviceData.value;
  this._addDataService.editData(this.tableData);
  console.log(this.deviceData.value);
  
}
}
