import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../servicelist/user-data.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  tableData=[];
  statusCol:boolean=false;
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
 saveData(fname:string,lname:string, empid:string, email:string){
   this._addDataService.addData(
     {
       "name" : fname+lname,
       "empid": empid,
       "email" : email,
       "devices":  1,
       "status" : "Active"
       
     }
   );
   this.getDataFromService();
 }
 deleteRow(index){
   this.tableData.splice(index, 1);
   localStorage.setItem('dataUser', JSON.stringify(this.tableData)); 
}
setActive(i:number)
{
 this.tableData[i].status='Active';
 localStorage.setItem('dataUser', JSON.stringify(this.tableData)); 
 
}
setInactive(i:number)
{
 this.tableData[i].status='Inactive';
 localStorage.setItem('dataUser', JSON.stringify(this.tableData)); 
}
logOut()
{
 localStorage.removeItem('login');
 this.route.navigate(['/login']);
}

}
