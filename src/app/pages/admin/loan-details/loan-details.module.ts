import { NbThemeModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LoanDetailsComponent } from './loan-details.component';
import { LoanDetailsRoutingModule } from './loan-details-routing.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { ChartsModule } from 'src/app/@charts/chart.module';


@NgModule({
  declarations: [
   LoanDetailsComponent
  ],
  imports: [
    CommonModule,
    LoanDetailsRoutingModule,
    NbThemeModule,
    NbCardModule,
    TablesModule,
    NbButtonModule
  ],
  providers:[DecimalPipe]
})
export class LoanDetailsModule { }
