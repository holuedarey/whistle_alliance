import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ChartiComponent } from './chart-components/charti/charti.component';
import { ChartiiComponent } from './chart-components/chartii/chartii.component';
import { ThemeModule } from '../@theme/theme.module';
import { ChartModule } from 'angular2-chartjs';


@NgModule({
  declarations: [ChartComponent, ChartiComponent, ChartiiComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ChartModule
  ],
  exports: [ChartComponent]
})
export class ChartsModule { }
