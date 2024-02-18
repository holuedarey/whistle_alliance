import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { UserService } from 'src/app/@core/data-services/user.service';
import { ConfirmationDialogComponent } from 'src/app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { LoanCommentComponent } from './loan-comment/loan-comment.component';


@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss']
})
export class LoanDetailsComponent implements OnInit {
  isLoadingData = true;
  loanId: any;
  userId: any;
  fullname: string = "";
  createdDate: string = '';
  loanData: any = [];
  loanDataFile: any = [];

  userData: any;
  loanSchedule: any = [];
  loanType: string = ''
  monthlyPayment: any;


  isSubmitted: boolean = false;

  comment: any = [];
  IfComment: boolean = false;
  isApproved = false;
  constructor(
    private loanService: LoanService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private dialogService: NbDialogService,
    private cd: ChangeDetectorRef,
    private toastr: NbToastrService,

  ) {
    this.loanId = this.activatedRoute.snapshot.queryParams.loanId;
    this.userId = this.activatedRoute.snapshot.queryParams.userId;

  }

  ngOnInit(): void {
    this.requestData()
    this.getSingleUser(this.userId)
    this.requestDataRepayment();
  }

  requestData(data?: any) {
    this.isLoadingData = true;
    this.isLoadingData = true;
    this.loanService.getSingleLoanById(this.loanId)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response) {
            this.loanData = response.content[0] ?? {};
            this.loanType = this.loanData.product[0]?.productName;
            this.loanDataFile = this.loanData?.files || [];
            this.comment = this.loanDataFile;
            this.isApproved = ['DECLINED', 'APPROVED'].includes(this.loanData?.status)  ? true : false; 

            this.comment = this.comment.filter((item: any) => item?.comments[item?.comments.at(-1)]?.status == 'DECLINED' ?? []);
          
            this.IfComment = this.comment.length > 0 ? true : false;
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

  requestDataRepayment(data?: any) {
    this.isLoadingData = true;
    this.isLoadingData = true;
    this.loanService.getSingleLoan(this.loanId)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response) {
            const loanData = response.content ?? {};
            this.monthlyPayment = loanData.monthlyPayment;
            this.loanSchedule = loanData?.schedules
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

  downloadLoanFile(id?: any) {
    this.isLoadingData = true;
    console.log("this.loanDataFile  now", );

    this.loanService.getSingleLoanFile(id)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response) {
            console.log("this.loanDataFile", );
            const file = new window.Blob([response.data], { type: 'contentType' });

            const downloadAncher = document.createElement("a");
            downloadAncher.style.display = "none";
            
            const fileURL = URL.createObjectURL(file);
            downloadAncher.href = fileURL;
            downloadAncher.download = 'fileName';
            downloadAncher.click();
          }
        },
        (err) => {
          console.log("error", err);
          
          this.isLoadingData = false;
        }
      )
  }

  async getSingleUser(userId: any) {
    this.userService.getSingleUser(userId).subscribe(
      (result) => {
        this.userData = result.content[0];
        this.fullname = this.userData?.firstName + ' ' + this.userData?.lastName;
        this.createdDate = `Account Created ${new Date(this.userData?.createdDate ?? "").toDateString()}`;
      })
  }

  approveLoan() {
    const payload = {
      "comment": "",
      "loanId": this.loanId,
      "loanStatus": "APPROVED"
    }
    this.loanService.approveRejectLoan(payload).subscribe(
      (result) => {
        this.requestDataRepayment();
            this.requestData()
        this.toastr.success('Loan Application', 'Loan Approved Successfully', { position: NbGlobalPhysicalPosition.TOP_RIGHT })
      }, (error) => {
        this.toastr.danger('Loan Application', error.message || 'Loan Approval  Failed', { position: NbGlobalPhysicalPosition.TOP_RIGHT })
      })
  }

  async rejectLoan() {
    this.cd.detectChanges();
    const confirmed = await this.dialogService.open(
      LoanCommentComponent,
      {
        context: {
          context: `Are you sure you wish to proceed?`,
          title: `Reject Loan?`
        },
      })
      .onClose.toPromise();

    if (confirmed) {

      const payload = {
        "comment": "",
        "loanId": this.loanId,
        "loanStatus": "DECLINED"
      }
      this.loanService.approveRejectLoan(payload).subscribe(
        (response) => {
          if (response) {
            this.requestDataRepayment();
            this.requestData()
            this.toastr.success('Loan Rejected successful', 'Loan Rejected Successfully', {
              position: NbGlobalPhysicalPosition
                .BOTTOM_RIGHT
            })
            this.isSubmitted = false;
            this.cd.detectChanges();
          } else {
            // this.errorResponse(true, true, response.message);
          }
        },
        (error) => {
          // this.errorResponse(true);
        this.toastr.danger('Loan Application', error.message || 'Loan Approval  Failed', { position: NbGlobalPhysicalPosition.TOP_RIGHT })

        }
      )
    } else {
      // this.errorResponse(true, false);
    }
  }
  approveFile(loan: any) {
    const payload = {
      "comment": "",
      "status": "APPROVED"
    }
    this.loanService.approveRejectLoanFile(loan.id, payload).subscribe(
      (response) => {
        if (response) {
          console.log("approv", response);
          this.requestDataRepayment();
          this.requestData()
          this.toastr.success('Document Approved successful', 'User Update', {
            position: NbGlobalPhysicalPosition
              .BOTTOM_RIGHT
          })
          this.isSubmitted = false;
          this.cd.detectChanges();
        } else {
          // this.errorResponse(true, true, response.message);
        }
      },
      (error) => {
        // this.errorResponse(true);
        this.toastr.danger('Loan Application', error.message || 'Loan File Approval  Failed', { position: NbGlobalPhysicalPosition.TOP_RIGHT })

      });
  }

  async rejectFile(loan: any) {

    this.isSubmitted = true;
    this.cd.detectChanges();
    const confirmed = await this.dialogService.open(
      LoanCommentComponent,
      {
        context: {
          context: `Are you sure you wish to proceed?`,
          title: `Reject Document?`
        },
      })
      .onClose.toPromise();

    if (confirmed) {

      console.log("got here", loan.id, confirmed.comment);
      const payload = {
        "comment": confirmed.comment || "",
        "status": "DECLINED"
      }
      this.loanService.approveRejectLoanFile(loan.id, payload).subscribe(
        (response) => {
          if (response) {
            this.requestDataRepayment();
            this.requestData()
            this.toastr.success('Document Rejected successful', 'User Update', {
              position: NbGlobalPhysicalPosition
                .BOTTOM_RIGHT
            })
            this.isSubmitted = false;
            this.cd.detectChanges();
          } else {
            // this.errorResponse(true, true, response.message);
          }
        },
        (error) => {
          // this.errorResponse(true);
        this.toastr.danger('Loan Application', error.message || 'Loan File Reject Failed', { position: NbGlobalPhysicalPosition.TOP_RIGHT })

        }
      )
    } else {
      // this.errorResponse(true, false);
    }
  }

  
}
