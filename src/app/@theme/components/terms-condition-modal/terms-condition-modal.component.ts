import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbThemeService } from '@nebular/theme';
import { AuthService } from 'src/app/@core/data-services/auth.service';

@Component({
  selector: 'app-terms-condition-modal',
  templateUrl: './terms-condition-modal.component.html',
  styleUrls: ['./terms-condition-modal.component.scss']
})
export class TermsAndConditionComponent {
  redirectDelay = 0;
  submitted = false
  constructor(
    private userAuthService: AuthService,
    public dialogRef: NbDialogRef<TermsAndConditionComponent>,
    protected cd: ChangeDetectorRef,
    protected router: Router,) {
  }

  close() {
    this.dialogRef.close(true);
  }


}
