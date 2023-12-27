import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { LocalStorageKey } from 'src/app/@core/enums/local-storage-key.enum';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { JwtPayloadModel } from 'src/app/@core/models/jwt-payload-model';
import { TokenExport } from 'src/app/@core/utils/custom-token-storage/custom-token-storage.module';
import { SecureLocalStorageService } from 'src/app/@core/utils/secure-local-storage.service';
const helper = new JwtHelperService();


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  isLoadingData = true;

  users:any[] = [];

  dataDoughnut = {
    labels: ["Web", "Mobile", "Device", "Other"],
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
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [39, 39, 41, 39, 52, 40],
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
    user: {
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
    },
    product: {
      title: 'Loan Type',
      valuePrepareFunction: (d: any) => {
        return d[0].productName
      },
    },
  }

  constructor(
    private loanService: LoanService,
    private secureLs: SecureLocalStorageService,
    private _decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    this.requestData()
  }

  requestData(data?: any) {
    this.isLoadingData = true;
    const token = this.secureLs.get<TokenExport>(LocalStorageKey.JWT.toString());
    const user:any = helper.decodeToken(token.token) as JwtPayloadModel;
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
}
