import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbDialogModule, NbInputModule, NbCardModule, NbFormFieldModule, NbSpinnerModule, NbIconModule, NbAlertModule, NbSelectModule, NbAutocompleteModule, NbStepperModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { RepaymentComponent } from './repayments.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { RepaymentRoutingModule } from './repayments-routing.module';
import { RepaymentModalComponent } from './repayment-component/repayment-modal/repayment-modal.component';
import { RepaymentButtonComponent } from './repayment-component/repayment-button/repayment-button.component';
import { LoanProgressStepperComponent } from './repayment-component/loan-progress-stepper/loan-progress-stepper.component';


@NgModule({
  declarations: [
    RepaymentComponent,RepaymentModalComponent, RepaymentButtonComponent, LoanProgressStepperComponent
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
    NbStepperModule,

  ],
  providers:[DecimalPipe]
})
export class RepaymentModule { }
