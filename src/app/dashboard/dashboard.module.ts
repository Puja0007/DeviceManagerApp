import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { DevicelistComponent } from './devicelist/devicelist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, User,Cpu,Eye,Plus,X,LogOut} from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github,
  User,
  Cpu,
  Eye,Plus,X,LogOut
};


@NgModule({
  declarations: [DashboardComponent, UserlistComponent, DevicelistComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FeatherModule.pick(icons),
  ]
})
export class DashboardModule { }
