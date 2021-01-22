
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm:FormGroup;
  logIn:boolean=false;


  


  constructor(private fb:FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'pswrd':new FormControl('',[Validators.required])
    })
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
  if(this.loginForm.valid)
  {
    this.route.navigate(['/dashboard/device']);
    
    
    // localStorage.setItem('login',"10");
  }
  else{
    this.markFormGroupTouched(this.loginForm);
  }
}
}
