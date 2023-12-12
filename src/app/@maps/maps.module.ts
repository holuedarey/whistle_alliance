import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LottieModule } from 'ngx-lottie';
import { ThemeModule } from '../@theme/theme.module';
import { MapCardComponent } from './map-card/map-card.component';
import { TablesModule } from '../@tables/tables.module';



@NgModule({
  declarations: [
    MapComponent,
    MapCardComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    LottieModule,
    ThemeModule,
    TablesModule
  ],
  exports: [
    MapComponent,
    MapCardComponent,
  ]
})
export class MapsModule { }
