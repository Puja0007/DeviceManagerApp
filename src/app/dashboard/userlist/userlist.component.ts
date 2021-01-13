import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../servicelist/user-data.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  tableData=[];
  showData=[];
  statusCol:boolean=false;
  addDataModal = false;
  num:number;
  isValid:boolean=true;
  deviceData = new FormGroup({
    fname : new FormControl(''),
    lname : new FormControl(''),
    email : new FormControl(''),
    empid : new FormControl(''),
    psw : new FormControl(''),
    pswrpt : new FormControl(''),
  });
 constructor(private _addDataService: UserDataService,private route:Router) { }

 ngOnInit(): void {
   this.getDataFromService();
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
 getDataFromService(){
   this.tableData = this._addDataService.getData();
 }
 saveData(fname:string,lname:string,email:string, empid:string){
   this._addDataService.addData(
     {
       "fname":fname,
       "lname":lname,
       "name" : fname+lname,
       "email" : email,
       "empid": empid,
       "devices":  1,
       "status" : "Active"
       
     }
   );
   this.getDataFromService();
 }
 showDetails(i)
  {
   this.showData=[
     {
       name: this.tableData[i].name,
       empid:this.tableData[i].empid,
       devicename: "Apple iPhoneX",
       deviceid: "ABCD-0001",
       assignedOn: "11.03.2020"

     }
   ]
}

editModel(i){
  var ele:HTMLElement = document.getElementById("edit-data") as HTMLElement;
  ele.style.display = "block";
  this.num=i;
  this.deviceData = new FormGroup({
    fname : new FormControl(this.tableData[i].fname),
    lname : new FormControl(this.tableData[i].lname),
    email:  new FormControl(this.tableData[i].email),
    empid: new FormControl(this.tableData[i].empid)
  });

  // this.editDeviceData
}
onSubmit()
{
  this.tableData[this.num]=this.deviceData.value;
  this._addDataService.editData(this.tableData);
  console.log(this.deviceData.value);
}
closeEdit(){
  var ele:HTMLElement = document.getElementById("edit-data") as HTMLElement;
  ele.style.display = "none";
}
 deleteRow(index){
   this.tableData.splice(index, 1);
   localStorage.setItem('dataUser', JSON.stringify(this.tableData)); 
}
setActive(i:number)
{
 this.tableData[i].status='Active';
 localStorage.setItem('dataUser', JSON.stringify(this.tableData)); 
 this.isValid=false;
 
}
setInactive(i:number)
{
 this.tableData[i].status='Inactive';
 localStorage.setItem('dataUser', JSON.stringify(this.tableData)); 
 this.isValid=true;
}


}
