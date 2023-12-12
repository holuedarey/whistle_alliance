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
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  isLoadingData = true;

  users:any[] = [];
  columns = {
    firstName: {
      title: 'First Name',
    },
    lastName: {
      title: 'Last Name',
    },
    email: {
      title: 'Email',
    },
    phone: {
      title: 'Phone Nos',
    },
    roleId: {
      title: 'Function',
      filter: {
        type: 'list',
        config: {
          selectText: 'Loading...',
          list: []
        },
      },
      valuePrepareFunction: (d: string, r: any) => {
        return r.role
      },
      filterFunction: (x: string, y: string) => {
        return x.toLowerCase() === y.toLowerCase();
      }
    },
  
  }

  constructor(
    private loanService: LoanService,
    private secureLs: SecureLocalStorageService,
  ) { }

  ngOnInit(): void {
    this.requestData()
  }

  requestData(data?: any) {
    this.isLoadingData = true;
    const token = this.secureLs.get<TokenExport>(LocalStorageKey.JWT.toString());
    const user:any = helper.decodeToken(token.token) as JwtPayloadModel;
    this.isLoadingData = true;
    this.loanService.getUserLoan(user.id, data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.users = GetUniqueArray([...(response.content[0]?.loan ?? [])], [...this.users]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }
}
