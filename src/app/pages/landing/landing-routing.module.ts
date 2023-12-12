import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { NinComponent } from './nin/nin.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { OtpComponent } from './otp/otp.component';
import { PreSigninComponent } from './pre-signin/pre-signin.component';
import { AuthResources, AuthResourcesNavMap } from '../auth/auth-resources';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'get-started',
    component: NinComponent
  },
  {
    path: 'personal-info',
    component: PersonalInfoComponent
  },
  {
    path: 'otp',
    component: OtpComponent
  },
  {
    path: 'pre-signin',
    component: PreSigninComponent
  },
  // {
  //   path: AuthResourcesNavMap.get(AuthResources.LoginView)?.path,
  //   component: LoginComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
