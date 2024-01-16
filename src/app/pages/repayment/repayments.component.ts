import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService, } from '@nebular/theme';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { SeoService } from 'src/app/@core/utils';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';
import { PermissionService } from 'src/app/@core/utils/permission.service';
import { RepaymentResources } from './repayments-resources';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { SecureLocalStorageService } from 'src/app/@core/utils/secure-local-storage.service';
import { DecimalPipe } from '@angular/common';
import { LocalStorageKey } from 'src/app/@core/enums/local-storage-key.enum';
import { TokenExport } from 'src/app/@core/utils/custom-token-storage/custom-token-storage.module';
import { JwtPayloadModel } from 'src/app/@core/models/jwt-payload-model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RepaymentButtonComponent } from './repayment-component/repayment-button/repayment-button.component';
const helper = new JwtHelperService();

@Component({
  selector: 'app-repayment',
  templateUrl: './repayments.component.html',
  styleUrls: ['./repayments.component.scss']
})
export class RepaymentComponent implements OnInit {

  RepaymentResources = RepaymentResources;
  isLoadingData = true;

  users:any[] = [];
  columns = {
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
    action: {
      title: 'Action',
      renderComponent: RepaymentButtonComponent,
      type: 'custom',
      filter:false,
    },
  }

  constructor(
    private dialogService: NbDialogService,
    private seo: SeoService,
    public onlineStat: OnlineStatService,
    public permissionService: PermissionService,
    private loanService: LoanService,
    private secureLs: SecureLocalStorageService,
    private _decimalPipe: DecimalPipe
  ) { }



  ngOnInit() {
    this.seo.setSeoData('User Management', 'Manage application users');
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
