import { NbThemeModule, NbCardModule, NbButtonModule, NbUserModule, NbButtonGroupModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LoanDetailsComponent } from './loan-details.component';
import { LoanDetailsRoutingModule } from './loan-details-routing.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { ThemeModule } from 'src/app/@theme/theme.module';


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
    NbButtonGroupModule,
    NbButtonModule,
    NbUserModule,
    ThemeModule
  ],
  providers:[DecimalPipe]
})
export class LoanDetailsModule { }
