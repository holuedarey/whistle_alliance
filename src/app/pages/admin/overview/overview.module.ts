import { NbThemeModule, NbCardModule, NbListModule, NbUserModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { ChartsModule } from 'src/app/@charts/chart.module';


@NgModule({
  declarations: [
   OverviewComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    NbThemeModule,
    NbCardModule,
    ChartsModule,
    NbListModule,
    NbUserModule,
    NbIconModule
  ],
  providers:[DecimalPipe]
})
export class OverviewModule { }
