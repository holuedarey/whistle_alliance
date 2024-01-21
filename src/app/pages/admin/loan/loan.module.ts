import { NbThemeModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LoanComponent } from './loan.component';
import { LoanRoutingModule } from './loan-routing.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { ChartsModule } from 'src/app/@charts/chart.module';
import { LoanDetailButtonComponent } from './loan-detail-button/loan-detail-button.component';


@NgModule({
  declarations: [
   LoanComponent, LoanDetailButtonComponent
  ],
  imports: [
    CommonModule,
    LoanRoutingModule,
    NbThemeModule,
    NbCardModule,
    TablesModule,
    ChartsModule,
    NbButtonModule
  ],
  providers:[DecimalPipe]
})
export class LoanModule { }
