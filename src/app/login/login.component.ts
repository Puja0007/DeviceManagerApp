import { Component, OnInit } from '@angular/core';
import { LoginForm} from  '../models/login.model';
import { FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'psw':new FormControl('',[Validators.required])
    })
  }

}
