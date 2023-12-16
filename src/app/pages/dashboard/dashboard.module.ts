import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NbCardModule, NbSelectModule, NbSpinnerModule, NbStepperModule } from '@nebular/theme';
import { SortablejsModule } from 'ngx-sortablejs';
import { ChartsModule } from 'src/app/@charts/chart.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoanApplicationComponent } from './common/loan-application/loan-application.component';


@NgModule({
  declarations: [DashboardComponent, LoanApplicationComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbCardModule,
    SortablejsModule,
    ThemeModule,
    ChartsModule,
    TablesModule,
    NbSpinnerModule,
    FormsModule,
    NbSelectModule,
    NbStepperModule,
    ReactiveFormsModule,
    // NbDatepickerModule
  ],
  providers: [DecimalPipe],
})
export class DashboardModule { }
