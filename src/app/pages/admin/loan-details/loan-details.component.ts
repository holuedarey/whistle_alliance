import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { UserService } from 'src/app/@core/data-services/user.service';


@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss']
})
export class LoanDetailsComponent implements OnInit {
  isLoadingData = true;
  loanId:any;
  userId:any;
  fullname: string = "";
  createdDate:string = '';
  loanData:any = [];
  userData:any;
  loanSchedule:any = []
  constructor(
    private loanService: LoanService,
    private activatedRoute: ActivatedRoute,
    private userService:UserService

  ) { 
    this.loanId = this.activatedRoute.snapshot.queryParams.loanId;
    this.userId = this.activatedRoute.snapshot.queryParams.userId;

  }

  ngOnInit(): void {
    this.requestData()
    this.getSingleUser(this.userId)
  }

  requestData(data?: any) {
    this.isLoadingData = true;
    this.isLoadingData = true;
    this.loanService.getSingleLoan(this.loanId)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response) {
            this.loanData = response.content ?? {};
            console.log("this.loanData", this.loanData);
            
            this.loanSchedule = this.loanData?.schedules
          }
        },
        (err) => {
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

  approveReject(type:any){
    console.log("status", type);
    this.userService.getSingleUser(1).subscribe(
      (result) => {
        this.userData = result.content[0];
        this.fullname = this.userData?.firstName + ' ' + this.userData?.lastName;
        this.createdDate = `Account Created ${new Date(this.userData?.createdDate ?? "").toDateString()}`;
      })
  }
}
