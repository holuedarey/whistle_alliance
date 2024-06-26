import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogRef, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { log } from 'console';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { RoleProvider } from 'src/app/@core/utils/role-provider.service';

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
  isAdmin:boolean = false;
  
  constructor(
    public dialogRef: NbDialogRef<RepaymentModalComponent>,
    public accessChecker: NbAccessChecker,
    private loanService:LoanService,
    private roleProvider: RoleProvider
  ) { }

  ngOnInit(): void {    
    this.requestData()
    const role = this.roleProvider.getRoleSync();
    if (role.includes('ADMIN')) {
      this.isAdmin = true;
    } else if (role.includes('USER')) {
      this.isAdmin = false;
    }
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
            console.log("loanSchedule", this.loanSchedule)
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
