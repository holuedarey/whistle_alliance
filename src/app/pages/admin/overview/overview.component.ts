import { DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Color } from 'chart.js';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { UserService } from 'src/app/@core/data-services/user.service';
import { LocalStorageKey } from 'src/app/@core/enums/local-storage-key.enum';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { JwtPayloadModel } from 'src/app/@core/models/jwt-payload-model';
import { TokenExport } from 'src/app/@core/utils/custom-token-storage/custom-token-storage.module';
import { SecureLocalStorageService } from 'src/app/@core/utils/secure-local-storage.service';
const helper = new JwtHelperService();


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  isLoadingData = false;
  summaryData: any;
  summaryDataChannel: any;
  laonSummaryData: any;

  topUsers: any[] = [];
  bgColor: Color[] = [];
  data = {
    labels: ["Jan", "Feb", "Mar", "Apr","May", "Jun"],
    datasets: [
      {
        // label: "Users by month",
        data: [1,2,3,4,5,7],
        borderColor: '#2B645D',
        backgroundColor: '#2B645D70',
      },

    ]
  };

  dataLoanChart = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        // label: "Users by month",
        data: [0,0,0],
        borderColor: '#2B645D',
        backgroundColor: '#2B645D70',
      },

    ]
  };

  users: any[] = [];

  dataDoughnut = {
    labels: ["Web", "Mobile", "Other"],
    datasets: [
      {
        data: [1, 0, 0],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      },

    ]
  };
  optionsDough = {
    responsive: true,
    legend: {
      display: true,
      position: 'right'
    }
  }
  options = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
    }
  }

  constructor(
    private loanService: LoanService,
    private secureLs: SecureLocalStorageService,
    private _decimalPipe: DecimalPipe,
    private userService: UserService,
    protected cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    // this.requestData()
    this.userSummary()
    this.loanSummary();
    // this.userSummaryChannel();
    console.log("init call");

  }

  ngOnUpdate(){
    console.log("update call");

  }
  requestData(data?: any) {
    this.isLoadingData = true;
    const token = this.secureLs.get<TokenExport>(LocalStorageKey.JWT.toString());
    const user: any = helper.decodeToken(token.token) as JwtPayloadModel;
    this.isLoadingData = true;
    this.loanService.getUserLoan(user.id, 20, data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.users = GetUniqueArray([...(response.content ?? [])], [...this.users]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

  userSummary(data?: any) {
    this.isLoadingData = true;
    this.userService.getUserSummary(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;

          if (response) {
            this.summaryData = response ?? [];
            this.topUsers = this.summaryData.topUsers;
            // Pass a function to map
            this.topUsers = this.topUsers.map((x) => {
              return {
                fullname: `${x.firstName} ${x.lastName}`,
                date: ` Created ${new Date(x?.createdDate ?? "").toDateString()}`
              }
            });

            // setTimeout(() => {
              this.data.labels = Object.keys(this.summaryData?.monthlyBreakdown);
              this.data.datasets[0]['data'] = Object.values(this.summaryData?.monthlyBreakdown)
              console.log("got here again", this.data);
            // }, 1000)
            // this.cd.detectChanges();
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

  userSummaryChannel(data?: any) {
    this.isLoadingData = true;
    this.userService.getUserSummaryChannel(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;

          if (response) {
            this.summaryDataChannel = response?.channel ?? [];
            this.dataDoughnut.labels = Object.keys(this.summaryDataChannel);
            this.dataDoughnut.datasets[0].data = Object.values(this.summaryDataChannel) || [1, 0, 0]
            this.cd.detectChanges();
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

  loanSummary(data?: any) {
    // this.isLoadingData = true;
    this.loanService.getLoanSummary(data)
      .subscribe(
        (response) => {
          // this.isLoadingData = false;
          if (response) {


            setTimeout(() => {
              this.laonSummaryData = response;
              console.log(Object.keys(this.summaryData?.monthlyBreakdown));
              
              this.dataLoanChart.labels = Object.keys(this.summaryData?.monthlyBreakdown);
              this.dataLoanChart.datasets[0].data = Object.values(this.summaryData?.monthlyBreakdown)
              this.cd.detectChanges();

              console.log("chcking 2:", this.dataLoanChart);
            }, 2000);
          }
        },
        (err) => {
          // this.isLoadingData = false;
        }
      )
  }
}
