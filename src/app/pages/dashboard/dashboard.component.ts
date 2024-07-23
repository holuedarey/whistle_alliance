import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { SeoService } from 'src/app/@core/utils';
import { LoanApplicationComponent } from './common/loan-application/loan-application.component';
import { UsersResources } from '../users/users-resources';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { Months } from 'src/app/@core/enums/month-of-year.enum';
import { ShareDataService } from 'src/app/@core/data-services/share-data.service';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { LoanCalculateDto } from 'src/app/@core/dtos/loan-calculate.dto';
import { DashboardService } from 'src/app/@core/data-services/dashboard.service';
import { SecureLocalStorageService } from 'src/app/@core/utils/secure-local-storage.service';
import { TokenExport } from 'src/app/@core/utils/custom-token-storage/custom-token-storage.module';
import { LocalStorageKey } from 'src/app/@core/enums/local-storage-key.enum';
import { JwtPayloadModel } from 'src/app/@core/models/jwt-payload-model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { UserService } from 'src/app/@core/data-services/user.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { HasAccess } from 'src/app/@core/decorators/has-access.decorator';
import { PermissionEnum } from 'src/app/@core/enums/permission.enum';
import { RoleProvider } from 'src/app/@core/utils/role-provider.service';
import { Router } from '@angular/router';
import { PagesResources, PagesResourcesNavMap } from '../pages-resources';
const helper = new JwtHelperService();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  months: any[] = Months;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  selectedProduct = ''
  selectedMonth = ''
  loan: any = {};
  loanRsponse: any = {};

  showCalculateFooter: boolean = false;

  usersResources = UsersResources;
  isLoadingData = true;

  users: UserDto[] = [];
  loanProducts: any[] = [];

  userId: any;
  userLoanLimit: any;

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
  }

  constructor(
    private seo: SeoService,
    private dialogService: NbDialogService,
    private shareDataservice: ShareDataService,
    private dashboardService: DashboardService,
    private loanService: LoanService,
    private userService: UserService,
    private secureLs: SecureLocalStorageService,
    private _decimalPipe: DecimalPipe,
    private _datePipe: DatePipe,
    private roleProvider: RoleProvider,
    protected router: Router,
  ) { 
    
  }
  async ngOnInit() {
    this.seo.setSeoData('Dashboard', 'Logged in user page analytics');
    const role = this.roleProvider.getRoleSync();
    if (role.includes('ADMIN')) {
       this.router.navigateByUrl(PagesResourcesNavMap.get(PagesResources.Overview)?.route as string);
    } 
    const token = this.secureLs.get<TokenExport>(LocalStorageKey.JWT.toString());
    const user: any = helper.decodeToken(token.token) as JwtPayloadModel;
    this.userId = user.id;

  

    this.getAllProducts();
    this.requestData()
    this.getSingleUser()
  }

  async getSingleUser() {
    this.userService.getSingleUser(this.userId).subscribe(
      (result) => {
        this.userLoanLimit = result.content[0]?.userLimit;
      })
  }

  getAllProducts(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = false;

    this.shareDataservice.getAllProduct().subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.loanProducts = result.content ?? [];
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        this.errors = [
          'An Error occured while logging you in.',
        ];
      }
    );
  }

  openLoanApplication() {
    // console.log("userLoanLimit", this.userLoanLimit);
    
    this.dialogService.open(LoanApplicationComponent,
      {
        context: {
          context: "Title",
          userLimit: this.userLoanLimit
        },
      }
    );
  }

  async calculateLoan() {
    this.errors = [];
    this.messages = [];
    this.submitted = false;

    const laonDto: LoanCalculateDto = {
      amount: this.loan.amount.replace(/[\s,]/g, ''),
      month: parseInt(this.selectedMonth),
      productId: parseInt(this.selectedProduct)
    };
    this.dashboardService.claculateLoan(laonDto).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.showCalculateFooter = !this.showCalculateFooter;
          this.loanRsponse = result.content[0]
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        this.errors = [
          'An Error occured while logging you in.',
        ];
      }
    );
  }

  requestData(data?: any) {
    this.isLoadingData = true;

    this.isLoadingData = true;
    this.loanService.getUserLoan(this.userId, data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.users = response.content ?? [];
          }
        },
        (err) => {
          console.log("response:", err);

          this.isLoadingData = false;
        }
      )
  }

  numberFormatComma(value: any) {
    return this.loan.amount = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }


}
