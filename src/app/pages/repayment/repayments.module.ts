import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbDialogModule, NbInputModule, NbCardModule, NbFormFieldModule, NbSpinnerModule, NbIconModule, NbAlertModule, NbSelectModule, NbAutocompleteModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepaymentComponent } from './repayments.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { RepaymentRoutingModule } from './repayments-routing.module';


@NgModule({
  declarations: [
    RepaymentComponent,
  ],
  imports: [
    CommonModule,
    RepaymentRoutingModule,
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
  ],
})
export class RepaymentModule { }
