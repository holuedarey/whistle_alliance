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
        path: PagesResourcesNavMap.get(PagesResources.RepaymentView)?.path,
        loadChildren: () => import('./repayment/repayments.module')
          .then(m => m.RepaymentModule),
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
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.Overview)?.path,
        loadChildren: () => import('./admin/overview/overview.module')
          .then(m => m.OverviewModule),
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.LoanView)?.path,
        loadChildren: () => import('./admin/loan/loan.module')
          .then(m => m.LoanModule),
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.LoanDetailsView)?.path,
        loadChildren: () => import('./admin/loan-details/loan-details.module')
          .then(m => m.LoanDetailsModule),
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.LoanProductView)?.path,
        loadChildren: () => import('./admin/product/product.module')
          .then(m => m.ProductModule),
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
