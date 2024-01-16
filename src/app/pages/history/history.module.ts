import { NbThemeModule, NbCardModule, NbButtonModule, NbDialogModule, NbInputModule, NbFormFieldModule, NbSpinnerModule, NbIconModule, NbAlertModule, NbSelectModule, NbAutocompleteModule, NbStepperModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HistoryComponent } from './history.component';
import { HistoryRoutingModule } from './history-routing.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';


@NgModule({
  declarations: [
   HistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    NbThemeModule,
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
export class HistoryModule { }
