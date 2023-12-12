import { NbThemeModule, NbCardModule, NbListModule, NbUserModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { NotificationCardComponent } from './notification-card/notification-card.component';


@NgModule({
  declarations: [
    NotificationComponent,
    NotificationCardComponent,
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    NbThemeModule,
    NbCardModule,
    NbListModule,
    NbUserModule
  ]
})
export class NotificationModule { }
