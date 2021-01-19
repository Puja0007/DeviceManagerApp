import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../helpers/must-match.validators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  registerForm:FormGroup;
  submitted:boolean=false;

  constructor(private fb: FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      'firstname':new FormControl(null,Validators.required),
     'lastname':new FormControl(null,Validators.required),
     'employeeID':new FormControl(null,Validators.required),
     'psw':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
     'pswrepeat':new FormControl('',[Validators.required])
   },
   {
     validator: MustMatch('psw','pswrepeat')
   });
  }
   
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
 
  onSubmit()
  {
    if(!this.registerForm.valid)
    {
      this.markFormGroupTouched(this.registerForm);
      
    }
   else{
    this.route.navigate(['/authentication/signin']);
     console.log(this.registerForm);
  
   }
    
  }
  
}
