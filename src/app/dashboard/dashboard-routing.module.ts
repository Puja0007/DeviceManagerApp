import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { DashboardComponent } from './dashboard.component';
import { DeviceComponent } from './device/device.component';

import { FormarraydeviceComponent } from './formarraydevice/formarraydevice.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [{ path: '', component: DashboardComponent },

{
  path:'user',
  component:UserComponent,
  canActivate:[AuthGuard]
},
{
  path:'device',
  component:DeviceComponent,
  canActivate:[AuthGuard]
},
{
  path:'formarraydevice',
  component:FormarraydeviceComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
