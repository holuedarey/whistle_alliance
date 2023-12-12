import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { LottieModule } from 'ngx-lottie';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { NinComponent } from './nin/nin.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { OtpComponent } from './otp/otp.component';
import { PreSigninComponent } from './pre-signin/pre-signin.component';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginComponent } from './forms/login/login.component';
import { PersonalInfoFormComponent } from './forms/personal-info-form/personal-info-form.component';
import { OtpFormComponent } from './forms/otp-form/otp-form.component';
import { NinFormComponent } from './forms/nin-form/nin-form.component';
import { LogoHeaderComponent } from './common/logo-header/logo-header.component';
import { OtpSuccessComponent } from 'src/app/@theme/components/otp-success/otp-success.component';


@NgModule({
  declarations: [LandingComponent, NinComponent, PersonalInfoComponent, OtpComponent, PreSigninComponent, PersonalInfoFormComponent, OtpFormComponent, NinFormComponent, LogoHeaderComponent, OtpSuccessComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    LottieModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbFormFieldModule,
    FormsModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbInputModule,
    NbCardModule
  ]
})
export class LandingModule { }
