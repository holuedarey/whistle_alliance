import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbThemeService } from '@nebular/theme';
import { AuthService } from 'src/app/@core/data-services/auth.service';
import { UserModel } from 'src/app/@core/models/user.model';
import { AuthResources, AuthResourcesNavMap } from 'src/app/pages/auth/auth-resources';

@Component({
  selector: 'app-otp-success',
  templateUrl: './otp-success.component.html',
  styleUrls: ['./otp-success.component.scss']
})
export class OtpSuccessComponent {
  redirectDelay = 0;

  constructor(
    private userAuthService: AuthService,
    public dialogRef: NbDialogRef<OtpSuccessComponent>,
    protected cd: ChangeDetectorRef,
    protected router: Router,) {
  }

  close() {
    this.dialogRef.close();
  }


  onSuccess(): void {
    console.log("dashboard clock")
    setTimeout(() => {
      return this.router.navigateByUrl(AuthResourcesNavMap.get(AuthResources.LoginView)?.route as string);
    }, this.redirectDelay);
    this.cd.detectChanges();

  }

}
