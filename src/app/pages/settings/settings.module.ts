import { NbThemeModule, NbCardModule, NbListModule, NbButtonModule, NbIconModule, NbFormFieldModule, NbInputModule, NbSpinnerModule, NbAlertModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsCardComponent } from './settings-card/settings-card.component';
import { SettingsChartComponent } from './settings-chart/settings-chart.component';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SettingsCardComponent,
    SettingsChartComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NbThemeModule,
    NbCardModule,
    NbListModule,
    NbButtonModule,
    NbIconModule,
    FormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbSpinnerModule,
    NbAlertModule
  ]
})
export class SettingsModule { }
