import { Component, OnInit } from '@angular/core';
import {RegistrationModel} from '../models/register.model';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  submitted:boolean=false;
  constructor(private fb: FormBuilder,private route:Router) { }

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
  // get f() { return this.registerForm.controls; }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
 
  onSubmit(form:any)
  {
    if(!form.valid)
    {
      this.markFormGroupTouched(this.registerForm);
      
    }
   else{
    this.route.navigate(['/login']);
   }
    
  }
  // goToLogin(form:any)
  // {
  //   if(form.valid)
  //   {
  //     this.route.navigate(['/login']);
  //   }
  // }
}

