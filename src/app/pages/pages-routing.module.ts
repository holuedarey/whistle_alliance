import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionGuard } from '../@core/guards/has-permission.guard';
import { PagesResources, PagesResourcesNavMap } from './pages-resources';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    // canActivateChild: [HasPermissionGuard],
    children: [
      {
        path: '',
        redirectTo: PagesResourcesNavMap.get(PagesResources.DashboardView)?.path
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.DashboardView)?.path,
        loadChildren: () => import('./dashboard/dashboard.module')
          .then(m => m.DashboardModule),
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.UsersView)?.path,
        loadChildren: () => import('./users/users.module')
          .then(m => m.UsersModule),
      },

      {
        path: PagesResourcesNavMap.get(PagesResources.ConfigView)?.path,
        loadChildren: () => import('./settings/settings.module')
          .then(m => m.SettingsModule),
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.NotificationView)?.path,
        loadChildren: () => import('./notification/notification.module')
          .then(m => m.NotificationModule),
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.HistoryView)?.path,
        loadChildren: () => import('./history/history.module')
          .then(m => m.HistoryModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
