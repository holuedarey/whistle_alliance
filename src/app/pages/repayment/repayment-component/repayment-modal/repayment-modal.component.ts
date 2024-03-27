import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogRef, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { log } from 'console';
import { LoanService } from 'src/app/@core/data-services/loan.service';

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
  pofForm :any = {};
  
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

   
  close(): void {
    this.dialogRef.close(false);
  }
}
