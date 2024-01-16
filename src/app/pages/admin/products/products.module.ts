import { NbThemeModule, NbCardModule, NbFormFieldModule, NbIconModule, NbButtonModule, NbInputModule, NbSpinnerModule, NbAlertModule, NbAccordionModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
   ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NbThemeModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    FormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbSpinnerModule,
    NbAlertModule,
    NbAccordionModule,
    ReactiveFormsModule
  ],
  providers:[]
})
export class ProductsModule { }
