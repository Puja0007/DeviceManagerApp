import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formarraydevice',
  templateUrl: './formarraydevice.component.html',
  styleUrls: ['./formarraydevice.component.css']
})
export class FormarraydeviceComponent implements OnInit {
    
  constructor(private fb:FormBuilder) { }
  public addmore:FormGroup;

  ngOnInit(): void {
    this.addmore=this.fb.group({
      itemRows:this.fb.array([this.addItemRows(),Validators.required])
    });
  }
  get formArr(){
    return this.addmore.get('itemRows') as FormArray;
  }
addItemRows(){
   
  return this.fb.group({
    sno:['',[Validators.required]],
    items:['',[Validators.required]],
    prices:['',[Validators.required]]
  })
}
addNew(){
  this.formArr.push(this.addItemRows());
}
deleteRow(i:number){
  this.formArr.removeAt(i);
}
// addNew(): void {
//   this.formArr.push(this.fb.control(this.addItemRows(), Validators.required));
// }
getValidity(i) {
  return (<FormArray>this.addmore.get('itemRows')).controls[i].invalid;
}
submit(){
  console.log(this.addmore.value);
  
}
}
