import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from '../servicelist/app-data.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  addDataModal:boolean=false;
  tableData=[];
  num:number;
  show:boolean;
  showData=[];
  public isName = true;
  isValid = new Array(this.tableData.length).fill(false);
  // assigned=new Array(this.tableData.length).fill(true);
  // assignedCheck=new Array(this.tableData.length).fill(false);
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
  // check(i)
  // {
  //   this.tableData[i].name='NA';
  //   localStorage.setItem('data', JSON.stringify(this.tableData));
  //  if(this.tableData[i].name=='NA')
  //  {
  //   this.assigned[i]=true;
  //  }
  // }
  openNewForm()
  {
    var ele:HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "block";
    this.addDataModal=true;
    this.deviceData.reset();
  }
  close()
  {
    var ele:HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "none";
    this.addDataModal=false;
  }
  getDataFromService(){
    this.tableData = this._addDataService.getData();
  }
  onSubmit(form:any){
  
    if(this.addDataModal)
    {
      this._addDataService.addData(form.value);
      this.getDataFromService();
      var ele:HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "none";
    this.addDataModal=false;
      
    }
    else{
      this.tableData[this.num]=this.deviceData.value;
      this._addDataService.editData(this.tableData);
      var ele:HTMLElement = document.getElementById("edit-data") as HTMLElement;
    ele.style.display = "none";
    }
  }
  changeShow()
  {
    this.show=true;
  }
  closeEdit()
  {
    var ele:HTMLElement = document.getElementById("edit-data") as HTMLElement;
  ele.style.display = "none";
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

cutAssigned(i){ 
  this.isName = false;
  localStorage.setItem('data', JSON.stringify(this.tableData));
  var ele:HTMLElement=document.getElementById("cut") as HTMLElement;

  ele.className= this.isName ? "fa fa-check text-success" : "fa fa-times-circle text-danger";

}
deleteRow(index){
  this.tableData.splice(index, 1);
  localStorage.setItem('data', JSON.stringify(this.tableData)); 
}
setActive(i:number)
{
 var newData = this._addDataService.getData();
 this.tableData[i].name=newData[i].name;
 this.isValid[i]=false;
 
}
setInactive(i)
{
 this.tableData[i].name='NA';
 this.isValid[i]=true;
}
}
