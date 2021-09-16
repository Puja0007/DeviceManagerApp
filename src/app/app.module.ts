import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms' 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, User,Cpu,Eye,Plus,X } from 'angular-feather/icons';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const icons = {
  Camera,
  Heart,
  Github,
  User,
  Cpu,
  Eye,Plus,X
};

@NgModule({
  declarations: [
    AppComponent,
   
  
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FeatherModule.pick(icons),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
    
  ],
  exports: [
    FeatherModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
