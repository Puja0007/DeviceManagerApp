import { Component, OnInit } from '@angular/core';
import { LoginForm} from  '../models/login.model';
import { FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'psw':new FormControl('',[Validators.required])
    })
  }
goToPage(form:any)
{
  if(form.valid)
  {
    this.route.navigate(['/devices']);
  }
}
}
