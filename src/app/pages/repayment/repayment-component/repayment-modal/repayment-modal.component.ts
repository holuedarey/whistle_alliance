import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogRef, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { log } from 'console';
import { ViewCell } from 'ng2-smart-table';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { UserService } from 'src/app/@core/data-services/user.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';

@Component({
  selector: 'app-repayment-modal',
  templateUrl: './repayment-modal.component.html',
  styleUrls: ['./repayment-modal.component.scss']
})
export class RepaymentModalComponent implements OnInit {

  @Input()
  loan:any;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  loanDetails:any = [];
  loanSchedule:any[] = [];
  loanType: any;
  constructor(
    public dialogRef: NbDialogRef<RepaymentModalComponent>,
    public accessChecker: NbAccessChecker,
    private loanService:LoanService
  ) { }

  ngOnInit(): void {
    this.requestData()
  }

  requestData() {
    this.submitted = true;

    this.loanService.getSingleLoan(this.loan.id)
      .subscribe(
        (response) => {
          this.submitted = false;
          if (response) {
            this.loanDetails = response.content ?? {};
            this.loanSchedule = this.loanDetails?.schedules;
            this.loanType = this.loan.product[0].productName;
            
          }
        },
        (err) => {
          this.submitted = false;
        }
      )
  }

  requestDataTable(){

  }  
  close(): void {
    this.dialogRef.close(false);
  }
}
