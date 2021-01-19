import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { DashboardComponent } from './dashboard.component';
import { DeviceComponent } from './device/device.component';
import { DevicelistComponent } from './devicelist/devicelist.component';
import { FormarraydeviceComponent } from './formarraydevice/formarraydevice.component';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [{ path: '', component: DashboardComponent },
{
  path:'devicelist',
  component:DevicelistComponent,
  canActivate:[AuthGuard]
},
{
  path:'userlist',
  component:UserlistComponent,
  canActivate:[AuthGuard]
},
{
  path:'user',
  component:UserComponent
},
{
  path:'device',
  component:DeviceComponent
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
