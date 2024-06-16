import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { SecureLocalStorageService } from 'src/app/@core/utils/secure-local-storage.service';
import { LoanDetailButtonComponent } from './loan-detail-button/loan-detail-button.component';
import { UserService } from 'src/app/@core/data-services/user.service';
const helper = new JwtHelperService();


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  isLoadingData = true;

  loans: any[] = [];
  laonSummaryData: any = {};
  summaryDataChannel:any;

  dataDoughnut = {
    labels: [''],
    datasets: [
      {
        data: [65, 59, 80, 40],
        backgroundColor: [
          'rgb(255, 207, 15)',
          'rgb(0, 87, 178)',
          'rgb(43, 100, 93)',
          'rgb(220, 20, 60)'
        ],
        hoverOffset: 6
      },

    ]
  };
  dataBarChart = {
    labels: [''],
    datasets: [
      {
        data: [''],
        backgroundColor: '#2B645D',
        barPercentage: 0.5,
        barThickness: 15,
        maxBarThickness: 15,
        minBarLength: 1,
      },
    ]
  };

  optionsBarChart = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  optionsDough = {
    responsive: true,
    legend: {
      display: true,
      position: 'right'
    }
  }

  columns = {
    applicantName: {
      title: 'User',
    },
    amount: {
      title: 'Loan Amount',
      valuePrepareFunction: (num: any) => {
        return `₦${this._decimalPipe.transform(num, '1.2-2')}`
      },
    },
    paymentMonth: {
      title: 'Repayment Tenure Month(s)',
    },
    status: {
      title: 'Status',
    },
    applicationDate: {
      title: 'Application Date',
      valuePrepareFunction: (num: any) => {
        return this._datePipe.transform(num, 'mediumDate')
      },
    },
    product: {
      title: 'Loan Type',
      valuePrepareFunction: (d: any) => {
        return d[0].productName
      },
    },
    action: {
      title: 'Action',
      renderComponent: LoanDetailButtonComponent,
      type: 'custom',
      filter: false,
    },
  }

  constructor(
    private loanService: LoanService,
    private secureLs: SecureLocalStorageService,
    private _decimalPipe: DecimalPipe,
    private userService:UserService,
    private _datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.requestData();
    this.loanSummary();
    this.userSummaryChannel()
  }

  requestData(data?: any) {
    this.isLoadingData = true;
    this.loanService.getAllLoan(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.loans = GetUniqueArray([...(response.content ?? [])], [...this.loans]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

  loanSummary(data?: any) {
    this.isLoadingData = true;
    this.loanService.getLoanSummary(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response) {
            this.laonSummaryData = response;
            this.dataBarChart.labels = Object.keys((this.laonSummaryData?.monthlyBreakdown).split('_')[1]);
            this.dataBarChart.datasets[0].data = Object.values(this.laonSummaryData?.monthlyBreakdown)
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
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }
}
