import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { profileEnd } from 'console';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { RoleProvider } from 'src/app/@core/utils/role-provider.service';

@Component({
  selector: 'app-repayment-modal',
  templateUrl: './repayment-pop-modal.component.html',
  styleUrls: ['./repayment-pop-modal.component.scss']
})
export class RepaymentPopModalComponent implements OnInit {

  @Input()
  loan: any;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  loanType: any;
  pofFile: any;
  isAdmin = false;
  filePresent: any;
  isFilePresent: boolean = false;
  constructor(
    public dialogRef: NbDialogRef<RepaymentPopModalComponent>,
    public accessChecker: NbAccessChecker,
    private loanService: LoanService,
    private toastr: NbToastrService,
    private roleProvider: RoleProvider,
    protected cd: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {

    console.log("loan", this.loan.paymentFileUrl);

    this.isFilePresent = !!this.loan.paymentFileUrl || false;
    this.filePresent = this.loan.paymentFileUrl
    const role = this.roleProvider.getRoleSync();
    if (role.includes('ADMIN')) {
      this.isAdmin = true;
    } else if (role.includes('USER')) {
      this.isAdmin = false;
    }
  }

  approveRejectPop() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const payload = {
      "scheduleId": this.loan.id,
      "loanId": this.loan.loanId

    }
    this.loanService.approveRejectLoanPOP(payload).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status === '200') {
          this.messages = ['Loan Created Successfully'];
          this.toastr.success('Proof of Payment', 'Your Proof of Payment submitted  Successfully', { position: NbGlobalPhysicalPosition.TOP_RIGHT });
          this.dialogRef.close(true)
        } else {
          this.errors = [
            result.message as string
          ];
        }
        this.isFilePresent = true;
        this.filePresent = this.loan.paymentFileUrl
        this.cd.detectChanges();
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        console.log("Error from serer: ", error);
        this.errors = [
          'An Error occured while creating Loan.',
        ];
      }
    );
  }

  submitPof() {
    if (!this.pofFile) {
      this.toastr.danger('You must Select a file to proceed', 'File Selection', { position: NbGlobalPhysicalPosition.TOP_RIGHT })
    }
    else {
      //upload the file
      this.errors = [];
      this.messages = [];
      this.submitted = true;

      const formData = new FormData();
      formData.append("proofOfPayment", this.pofFile, this.pofFile.name);
      formData.append("paymentDate", new Date().toDateString())
      formData.append("amount", this.loan.monthlyPayment)
      formData.append("scheduleId", this.loan.id)
      formData.append("loanId", this.loan.loanId)

      this.loanService.createLoanPOP(formData).subscribe(
        (result) => {
          this.submitted = false;
          if (result.status === '200') {
            this.messages = ['Loan Created Successfully'];
            this.toastr.success('Your Proof of Payment submitted  Successfully', 'Proof of Payment', { position: NbGlobalPhysicalPosition.TOP_RIGHT });
            this.dialogRef.close(true)
          } else {
            this.errors = [
              result.message as string
            ];
          }
          this.isFilePresent = true;
          this.filePresent = this.loan.paymentFileUrl
          this.cd.detectChanges();
        },
        (error: ResponseDto<string>) => {
          this.submitted = false;
          console.log("Error from serer: ", error);
          this.errors = [
            'An Error occured while creating Loan.',
          ];
        }
      );

    }
  }

  onChangeFile(event: any) {
    this.pofFile = event.target.files[0];
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
