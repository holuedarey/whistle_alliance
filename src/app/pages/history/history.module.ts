import { NbThemeModule, NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { HistoryRoutingModule } from './history-routing.module';
import { TablesModule } from 'src/app/@tables/tables.module';


@NgModule({
  declarations: [
   HistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    NbThemeModule,
    NbCardModule,
    TablesModule
  ]
})
export class HistoryModule { }
