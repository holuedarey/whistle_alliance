import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbDialogModule, NbInputModule, NbCardModule, NbFormFieldModule, NbSpinnerModule, NbIconModule, NbAlertModule, NbSelectModule, NbAutocompleteModule, NbButtonGroupModule, NbStepperModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { UserStatusToggleComponent } from './user-table-components/user-status-toggle/user-status-toggle.component';
import { UserCardComponentComponent } from './user-table-components/user-card-component/user-card-component.component';
import { UserTransactionHistoryComponent } from './user-transaction-history/user-transaction-history.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    UserStatusToggleComponent,
    UserCardComponentComponent,
    UserTransactionHistoryComponent  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NbButtonModule,
    NbDialogModule,
    NbInputModule,
    NbCardModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbIconModule,
    NbAlertModule,
    NbSelectModule,
    ThemeModule,
    TablesModule,
    NbAutocompleteModule,
    NbButtonGroupModule,
    NbStepperModule,
  ],
  providers:[
    DecimalPipe
  ]
})
export class UsersModule { }
