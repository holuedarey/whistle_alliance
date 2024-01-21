import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserTransactionHistoryComponent } from './user-transaction-history/user-transaction-history.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'transaction',
    component: UserTransactionHistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
