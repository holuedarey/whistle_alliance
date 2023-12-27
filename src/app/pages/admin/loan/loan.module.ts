import { NbThemeModule, NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LoanComponent } from './loan.component';
import { LoanRoutingModule } from './loan-routing.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { ChartsModule } from 'src/app/@charts/chart.module';


@NgModule({
  declarations: [
   LoanComponent
  ],
  imports: [
    CommonModule,
    LoanRoutingModule,
    NbThemeModule,
    NbCardModule,
    TablesModule,
    ChartsModule
  ],
  providers:[DecimalPipe]
})
export class LoanModule { }
