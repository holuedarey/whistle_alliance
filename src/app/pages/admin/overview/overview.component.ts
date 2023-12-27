import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Color } from 'chart.js';
import { LoanService } from 'src/app/@core/data-services/loan.service';
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
  isLoadingData = true;

  bgColor: Color[] = [];
  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        // label: "Users by month",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#2B645D',
        backgroundColor: '#2B645D70',
      },

    ]
  };

  dataDoughnut = {
    labels: ["Web", "Mobile", "Other"],
    datasets: [
      {
        data: [65, 59, 80],
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
    legend: {
      display: false,
    }
  }

  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];
  constructor(
    private loanService: LoanService,
    private secureLs: SecureLocalStorageService,
    private _decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    // this.requestData()
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
}
