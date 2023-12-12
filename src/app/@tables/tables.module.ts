import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { TableComponent } from './table.component';
import { ThemeModule } from '../@theme/theme.module';
import { TableTagComponent } from './table-tag/table-tag.component';
import { NbSpinnerModule, NbTagModule } from '@nebular/theme';

@NgModule({
  declarations: [
    TableComponent,
    TableTagComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbTagModule,
    NbSpinnerModule
  ],
  exports: [
    TableComponent,
  ]
})
export class TablesModule { }
