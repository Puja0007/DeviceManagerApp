import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { DashboardComponent } from './dashboard.component';
import { DevicelistComponent } from './devicelist/devicelist.component';
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
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
