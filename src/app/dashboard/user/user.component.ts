import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../servicelist/user-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  addDataModal = false;
  tableData=[];
  showData=[];
  num:number;
  user:string;
  isValid = new Array(this.tableData.length).fill(false);
  deviceData = new FormGroup({
    fname : new FormControl(''),
    lname : new FormControl(''),
    email : new FormControl(''),
    empid : new FormControl(''),
    psw : new FormControl(''),
    pswrpt : new FormControl(''),
    devices:new FormControl(''),
    status:new FormControl('')

  });
  constructor(private _addDataService: UserDataService,private route:Router) { }

  ngOnInit(): void {
    this.getDataFromService();
  }
  openNewForm() : void
  {
    var ele:HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "block";
    this.addDataModal=true;
    this.deviceData.reset();
  }
  close(){
    var ele:HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "none";
    this.addDataModal=false;
  }
  getDataFromService(){
    this.tableData = this._addDataService.getData();
  }
  onSubmit(form:any)
  {
    const FORM_VAL = form.value;
    const DATA ={
       "fname":FORM_VAL.fname,
       "lname":FORM_VAL.lname,
       "name" : FORM_VAL.fname+FORM_VAL.lname,
       "email" :FORM_VAL.email,
       "empid": FORM_VAL.empid,
       "devices":  1,
       "status" : "Active" 
    }
    if(this.addDataModal)
    {
      this._addDataService.addData(DATA);
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
  editModel(i){
    var ele:HTMLElement = document.getElementById("edit-data") as HTMLElement;
    ele.style.display = "block";
    this.num=i;
    this.deviceData = new FormGroup({
      fname: new FormControl(this.tableData[i].fname),
      lname: new FormControl(this.tableData[i].lname),
      name: new FormControl(this.tableData[i].fname+this.tableData[i].lname),
      email: new FormControl(this.tableData[i].email),
      empid: new FormControl(this.tableData[i].empid),
      devices: new FormControl('1'),
      status:new FormControl('Active')
    });
    
  }
  closeEdit(){
    var ele:HTMLElement = document.getElementById("edit-data") as HTMLElement;
    ele.style.display = "none";
   
  }
  deleteRow(index){
    this.tableData.splice(index, 1);
    localStorage.setItem('dataUser', JSON.stringify(this.tableData)); 
 }

 showDetails(i)
  {
   this.showData=[
     {
       fname:this.tableData[i].fname,
       lname:this.tableData[i].lname,
       name: this.tableData[i].name,
       empid:this.tableData[i].empid,
       devicename: "Apple iPhoneX",
       deviceid: "ABCD-0001",
       assignedOn: "11.03.2020"

     }
   ]
}

changePasswordModal(i){
  var ele:HTMLElement = document.getElementById("change-password") as HTMLElement;
  ele.style.display = "block";
  this.user = this.tableData[i].fname;
}
closeChangepPassword(){

  var ele:HTMLElement = document.getElementById("change-password") as HTMLElement;
  ele.style.display = "none";
}
closePassword(){
  var ele:HTMLElement = document.getElementById("change-password") as HTMLElement;
  ele.style.display = "none";
}
setActive(i:number)
{
 this.tableData[i].status='Active';
 localStorage.setItem('dataUser', JSON.stringify(this.tableData)); 
 this.isValid[i]=false;
 
}
setInactive(i)
{
 this.tableData[i].status='Inactive';
 localStorage.setItem('dataUser', JSON.stringify(this.tableData)); 
 this.isValid[i]=true;
}

}
