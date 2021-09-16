import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { AppDataService } from '../servicelist/app-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  addDataModal: boolean = false;
  tableData = [];
  isAssignableArr = new Array(this.tableData.length).fill(true);
  isAssignable: boolean = false;
  assignDeviceNum: number;
  isMultiDevice:boolean = false;
  num: number;
  show: boolean;
  count = 0;
  showData = [];
  public isName = true;
  deviceType: string = "";
  deviceData: FormGroup;
  assignDeviceForm: FormGroup;
  isValid = new Array(this.tableData.length).fill(false);
 
  constructor(private _addDataService: AppDataService, private route: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDataFromService();
    this.deviceData = new FormGroup({
      device: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      // device : new FormControl('',[Validators.required]),
      type: new FormControl('', [Validators.required]),
      os: new FormControl('', [Validators.required]),
      ram: new FormControl('', [Validators.required]),
      memory: new FormControl('', [Validators.required]),
      imeiNo: new FormControl('', [Validators.required]),
    });
    this.assignDeviceForm = new FormGroup({
      empId: new FormControl('', [Validators.required]),
      deviceId: new FormControl('', [Validators.required]),
    })
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
  openNewForm() {
    var ele: HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "block";
    this.addDataModal = true;
    this.deviceData.reset();
  }
  close() {
    var ele: HTMLElement = document.getElementById("add-new-data") as HTMLElement;
    ele.style.display = "none";
    this.addDataModal = false;
  }
  getDataFromService() {
    this.http.get('http://localhost:4500/devices/').subscribe((result: any) => {
      this.tableData = result;
      this.tableData = this.tableData.reverse();
    })
  }
  onSubmit(form: any) {
    if (this.addDataModal) {
      let payload = this.deviceData.value;
      payload['enable'] = true;
      payload['status'] = 'Available';
      this.http.post('http://localhost:4500/devices/', payload).subscribe((res: any) => {
        console.log(res.data);
        this.getDataFromService();
        this.toastr.success("Device is successfully added", 'Success', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });

      })
      var ele: HTMLElement = document.getElementById("add-new-data") as HTMLElement;
      ele.style.display = "none";
      this.addDataModal = false;

    }
    else {
      let payLoad = this.deviceData.value;
      payLoad['enable'] = true;
      payLoad['status'] = 'Available';
      this.http.put('http://localhost:4500/devices/' + this.tableData[this.num].id, payLoad).subscribe((result: any) => {
        console.log(result);
        this.getDataFromService();
        this.toastr.success("Device information is successfully edited", 'Success', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      })
      // this.tableData[this.num]=this.deviceData.value;
      // this._addDataService.editData(this.tableData);
      var ele: HTMLElement = document.getElementById("edit-data") as HTMLElement;
      ele.style.display = "none";
    }
  }
  changeShow() {
    this.show = true;
  }
  closeEdit() {
    var ele: HTMLElement = document.getElementById("edit-data") as HTMLElement;
    ele.style.display = "none";
  }
  editModel(i) {
    var ele: HTMLElement = document.getElementById("edit-data") as HTMLElement;
    ele.style.display = "block";
    this.num = i;
    this.deviceType = this.tableData[i].type;
    let setDeviceData = {
      device: this.tableData[i].device,
      name: this.tableData[i].name,
      brand: this.tableData[i].brand,
      type: this.tableData[i].type,
      os: this.tableData[i].os,
      ram: this.tableData[i].ram,
      memory: this.tableData[i].memory,
      imeiNo: this.tableData[i].imeiNo,
    };
    this.deviceData.setValue(setDeviceData)

  }
  changePasswordModal(i) {
    var ele: HTMLElement = document.getElementById("change-password") as HTMLElement;
    ele.style.display = "block";

  }
  showDetails(i) {
    this.showData = [
      {
        name: this.tableData[i].name,
        os: this.tableData[i].os,
        memory: this.tableData[i].memory,
        imeiNo: this.tableData[i].imeiNo,
        ram: this.tableData[i].ram,
        brand: this.tableData[i].brand,
        type: this.tableData[i].type

      }
    ]
  }

  cutAssigned(i) {
    this.isName = false;
    localStorage.setItem('data', JSON.stringify(this.tableData));
    var ele: HTMLElement = document.getElementById("cut") as HTMLElement;

    ele.className = this.isName ? "fa fa-check text-success" : "fa fa-times-circle text-danger";

  }
  deleteRow(index) {

    this.http.delete('http://localhost:4500/devices/' + this.tableData[index].id).subscribe((result: any) => {
      this.getDataFromService();
      this.toastr.success("Device is successfully removed", 'Success', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
    })
    //this.tableData.splice(index, 1);

  }
  setActive(i: number) {
    this.tableData[i].status = "Available";
    this.isValid[i] = false;

  }
  setInactive(i) {
    this.tableData[i].status = 'NA';
    this.isValid[i] = true;
  }
  assignDevice() {
    this.isMultiDevice=false;
    this.count=0;
    this.http.get('http://localhost:4500/assignDevices/').subscribe((res: any) => {
      res.forEach((element) => {
        if (element.empId === this.assignDeviceForm.get('empId').value) {
         this.count++;
        }
      })
      if(this.count>0){
        res.forEach((element) => {
          if (element.empId === this.assignDeviceForm.get('empId').value){
            element.deviceId.push(this.assignDeviceForm.get('deviceId').value);
            let payload = element;
            this.http.put('http://localhost:4500/assignDevices/' + element.id, payload).subscribe((res:any)=>{
              let data = {
                'enable': false,
                'status':'NA'
              }
              this.http.patch('http://localhost:4500/devices/' + this.tableData[this.assignDeviceNum].id, data).subscribe((res: any) => {

              this.getDataFromService();
              this.toastr.success("Device is successfully assigned", 'Success', {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
              });
              })

            })
          }
        })
        
      }
      else{
        let payLoad = {
          'deviceId': [this.assignDeviceForm.get('deviceId').value],
          'empId': this.assignDeviceForm.get('empId').value
    
        }
        this.http.post('http://localhost:4500/assignDevices/', payLoad).subscribe((res: any) => {
          this.isValid[this.assignDeviceNum] = true;
          let data = {
            'enable': false,
            'status':'NA'
          }
          this.http.patch('http://localhost:4500/devices/' + this.tableData[this.assignDeviceNum].id, data).subscribe((res: any) => {
          this.getDataFromService();
          this.toastr.success("Device is successfully assigned", 'Success', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          })
    
        })
      }
         
    })
  }
  showAssignable(i) {
    this.assignDeviceNum = i;
    this.assignDeviceForm.reset();
    if (this.tableData[i].enable) {
      this.isAssignableArr[i] = true;
    }
    else if(!this.tableData[i].enable){
      this.isAssignableArr[i] = false;
    }
    if (this.isAssignableArr[i]) {
      this.isAssignable = true;
    }
    else {
      this.isAssignable = false;
      this.toastr.error("Device is Already assigned ...sorry..!!", 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
    }
  }
}
