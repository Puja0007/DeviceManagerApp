import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formarraydevice',
  templateUrl: './formarraydevice.component.html',
  styleUrls: ['./formarraydevice.component.css']
})
export class FormarraydeviceComponent implements OnInit {
    
  constructor(private fb:FormBuilder) { }
  public addmore:FormGroup;
  public isValid = false;
  ngOnInit(): void {
    this.addmore=this.fb.group({
      itemRows:this.fb.array([this.addItemRows()])
      
    });
  }
  get itemRows() : FormArray{
    return this.addmore.get('itemRows') as FormArray;
  }
addItemRows() : FormGroup{
   
  return this.fb.group({
    
    items:['',Validators.compose([Validators.required,Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$')])],
    prices:['',Validators.compose([Validators.required,Validators.pattern("^[0-9]*$")])]
  })
}



addNew(){
  this.itemRows.push(this.addItemRows());
}
deleteRow(i:number){
  this.itemRows.removeAt(i);
}

getValidity(i) {
  return (<FormArray>this.addmore.get('itemRows')).controls[i].invalid;
}



// checkNumber(control: AbstractControl): boolean {
//   // const price:string=control.value;
//   if(typeof(control.value) === "number")
//   {
//     return true;
//   }
//   else{
//    return false;
//   }
  
// } 
submit(){
  console.log(this.addmore);
  
}

}

