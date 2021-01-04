import { Component, OnInit } from '@angular/core';
import {RegistrationModel} from '../models/register.model';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  submitted:boolean=false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.registerForm=this.fb.group({
       'firstname':new FormControl(null,Validators.required),
      'lastname':new FormControl(null,Validators.required),
      'employeeID':new FormControl(null,Validators.required),
      'psw':new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
      'pswrepeat':new FormControl('',[Validators.required])
    },
    {
      validator: MustMatch('psw','pswrepeat')
    });
  }
  get f() { return this.registerForm.controls; }
 
  onSubmit()
  {
    console.log(this.registerForm);
    this.submitted=true;
    console.log(this.submitted);
    
  }
}

