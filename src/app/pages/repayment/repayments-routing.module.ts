import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepaymentComponent } from './repayments.component';

const routes: Routes = [
  {
    path: '',
    component: RepaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepaymentRoutingModule { }
