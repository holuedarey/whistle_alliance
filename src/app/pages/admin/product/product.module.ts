import { NbThemeModule, NbCardModule, NbFormFieldModule, NbIconModule, NbButtonModule, NbInputModule, NbSpinnerModule, NbAlertModule, NbAccordionModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
   ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NbThemeModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    FormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbSpinnerModule,
    NbAlertModule,
    NbAccordionModule
  ],
  providers:[DecimalPipe]
})
export class ProductModule { }
