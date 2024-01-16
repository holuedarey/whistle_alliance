import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/@core/data-services/user.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';
import { ConfirmationDialogComponent } from 'src/app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { RepaymentModalComponent } from '../repayment-modal/repayment-modal.component';

@Component({
  selector: 'app-repayment-button',
  templateUrl: './repayment-button.component.html',
  styleUrls: ['./repayment-button.component.scss']
})
export class RepaymentButtonComponent implements ViewCell, OnInit {

  isSubmitted = false;

  @Input() value!: string | number;
  @Input() rowData!: any;


  constructor(
    private dialogService: NbDialogService,
    public userService: UserService,
    public onlineStat: OnlineStatService,
    private cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    public accessChecker: NbAccessChecker,
  ) { }

  ngOnInit(): void {
  }

  async onButtonClick() {
    this.isSubmitted = true;
    this.cd.detectChanges();
    //get loan details
    await this.dialogService.open(RepaymentModalComponent, {
      closeOnBackdropClick: false,
      context: { loan: this.rowData },
      closeOnEsc: false,
      hasScroll: true,
    }).onClose.toPromise();
 
  }


}
