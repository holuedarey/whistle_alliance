import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { UserService } from 'src/app/@core/data-services/user.service';

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


  users: any[] = [];

  type = 'line';
  LineData:any;
  LineOptions:any;

  dataLoanChart:any;

  constructor(
    private loanService: LoanService,
    private userService: UserService,
    protected cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  
    this.LineOptions = {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
      display: false,
    }
    };
  
    this.requestData()
    this.userSummary()
    this.loanSummary();
  }

  requestData(data?: any) {
    this.isLoadingData = true;
    this.loanService.getLoanSummary()
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            let labels = [];
            let datasets = [];
            for(const item in response?.monthlyBreakdown){
              labels.push((item.split('_')[1].substring(0,3)));
              datasets.push(response?.monthlyBreakdown[item])
            }
            this.LineData = {
              labels:labels,
              datasets: [
                {
                  data: datasets,
                  borderColor: '#2B645D',
                  backgroundColor: '#2B645D',
                  spanGaps:true
                }
              ]
            };
            
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
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

  // userSummaryChannel(data?: any) {
  //   this.isLoadingData = true;
  //   this.userService.getUserSummaryChannel(data)
  //     .subscribe(
  //       (response) => {
  //         this.isLoadingData = false;

  //         if (response) {
  //           this.summaryDataChannel = response?.channel ?? [];
  //           this.dataDoughnut.labels = Object.keys(this.summaryDataChannel);
  //           this.dataDoughnut.datasets[0].data = Object.values(this.summaryDataChannel) || [1, 0, 0]
  //           this.cd.detectChanges();
  //         }
  //       },
  //       (err) => {
  //         this.isLoadingData = false;
  //       }
  //     )
  // }

  loanSummary(data?: any) {
    // this.isLoadingData = true;
    this.loanService.getLoanSummary(data)
      .subscribe(
        (response) => {
          // this.isLoadingData = false;
          if (response) {
            this.laonSummaryData = response;
            let labels = [];
            let datasets = [];
            for(const item in response?.monthlyBreakdown){
              labels.push((item.split('_')[1].substring(0,3)));
              datasets.push(response?.monthlyBreakdown[item])
            }

            this.dataLoanChart = {
              labels: labels,
              datasets: [
                {
                  // label: "Users by month",
                  data: datasets,
                  borderColor: '#2B645D',
                  backgroundColor: '#2B645D',
                },
          
              ]
            };
          }
        },
        (err) => {
          // this.isLoadingData = false;
        }
      )
  }
}
