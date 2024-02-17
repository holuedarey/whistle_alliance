import { NbThemeModule, NbCardModule, NbButtonModule, NbUserModule, NbButtonGroupModule, NbInputModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LoanDetailsComponent } from './loan-details.component';
import { LoanDetailsRoutingModule } from './loan-details-routing.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { LoanCommentComponent } from './loan-comment/loan-comment.component';


@NgModule({
  declarations: [
   LoanDetailsComponent, LoanCommentComponent
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
    ThemeModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule
  ],
  providers:[DecimalPipe]
})
export class LoanDetailsModule { }
