import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  assignedDeviceDetails=[];
  allAssignDevices=[];
  assignDevicesNameId=[];
  assignedDevicesId=[];
  num:number;
  user:string;
  isValid = new Array(this.tableData.length).fill(false);
  userData = new FormGroup({
    name : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\\.[a-z]{2,4}$")]),
    emp : new FormControl('',[Validators.required]),

  });
  constructor(private _addDataService: UserDataService,private route:Router,private http: HttpClient,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDataFromService();
  }
  openNewForm() : void
  {
    var ele:HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "block";
    this.addDataModal=true;
    this.userData.reset();
  }
  close(){
    var ele:HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "none";
    this.addDataModal=false;
  }
  getDataFromService(){
    this.http.get('http://localhost:4500/users/').subscribe((result:any) =>{
      this.tableData=result;

    })
  }
  onSubmit(form:any)
  {
    const FORM_VAL = form.value;
    const DATA ={
       "name":FORM_VAL.name,
       "email" :FORM_VAL.email,
       "emp": FORM_VAL.emp,
       "status" : "Active" 
    }
    if(this.addDataModal)
    {
      this.http.post('http://localhost:4500/users/',DATA).subscribe((result:any)=>{
        console.log(result);
        this.getDataFromService();
        this.toastr.success("User is successfully added", 'Success', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        
      })
      
      var ele:HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "none";
    this.addDataModal=false;
      
    }
    else{
      
      this.http.put('http://localhost:4500/users/'+this.tableData[this.num].id,DATA).subscribe((result:any)=>{
        console.log(result);
        this.getDataFromService();
        this.toastr.success("User information is successfully edited", 'Success', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      })
      // this.tableData[this.num]=this.userData.value;
      // this._addDataService.editData(this.tableData);
      var ele:HTMLElement = document.getElementById("edit-data") as HTMLElement;
    ele.style.display = "none";
    }
    
    
  }
  editModel(i){
    var ele:HTMLElement = document.getElementById("edit-data") as HTMLElement;
    ele.style.display = "block";
    this.num=i;
    this.userData = new FormGroup({
      name: new FormControl(this.tableData[i].name),
      email: new FormControl(this.tableData[i].email),
      emp: new FormControl(this.tableData[i].emp),

    });
    
  }
  closeEdit(){
    var ele:HTMLElement = document.getElementById("edit-data") as HTMLElement;
    ele.style.display = "none";
   
  }
  deleteRow(index){

    this.http.delete('http://localhost:4500/users/'+this.tableData[index].id).subscribe((result:any)=>{
    this.getDataFromService();
    this.toastr.success("Device is successfully removed", 'Success', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    });
})
 }

 showDetails(i){
  this.allAssignDevices=[];
  this.assignedDevicesId=[];
  this.assignDevicesNameId=[];
  this.assignedDeviceDetails=[];
  this.http.get('http://localhost:4500/assignDevices/').subscribe((result:any)=>{
      this.allAssignDevices=result;
     this.allAssignDevices.forEach((elem)=>{
      if(this.tableData[i].emp==elem.empId){
       elem.deviceId.forEach((elem1)=>{
         this.assignedDevicesId.push(elem1);
       })
      }
    })
    console.log(this.assignedDevicesId);
    
     this.http.get('http://localhost:4500/devices/').subscribe((res:any)=>{
      this.assignedDeviceDetails=res.filter(element=>this.assignedDevicesId.includes(element.device))
      console.log(this.assignedDeviceDetails);
      console.log(res);
      
      this.assignedDeviceDetails.forEach((element1)=>{
        this.assignDevicesNameId.push({
          name:element1.name,
          id:element1.device,
          type:element1.type,
        })
      
     }) 
     console.log(this.assignDevicesNameId);
     
  })
 
 
  })
}changePasswordModal(i){
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
