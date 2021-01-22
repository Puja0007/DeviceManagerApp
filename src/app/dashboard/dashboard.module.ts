import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, User,Cpu,Eye,Plus,X,LogOut} from 'angular-feather/icons';
import { HeaderComponent } from '../header/header.component';
import { UserComponent } from './user/user.component';
import { DeviceComponent } from './device/device.component';
import { FormarraydeviceComponent } from './formarraydevice/formarraydevice.component';

const icons = {
  Camera,
  Heart,
  Github,
  User,
  Cpu,
  Eye,Plus,X,LogOut
};


@NgModule({
  declarations: [DashboardComponent,HeaderComponent, UserComponent, DeviceComponent, FormarraydeviceComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FeatherModule.pick(icons),
  ]
})
export class DashboardModule { }
