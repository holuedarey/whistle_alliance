import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/@core/data-services/message.service';
import { UserService } from 'src/app/@core/data-services/user.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { SeoService } from 'src/app/@core/utils';
import { RepaymentButtonComponent } from '../../repayment/repayment-component/repayment-button/repayment-button.component';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { LoanDto } from 'src/app/@core/dtos/loan.dto';

@Component({
  selector: 'app-user-transaction-history',
  templateUrl: './user-transaction-history.component.html',
  styleUrls: ['./user-transaction-history.component.scss']
})
export class UserTransactionHistoryComponent implements OnInit {

  isLoadingData = false;

  user:any = {};
  loans:any[] = [];
  userId:any;

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
    // action: {
    //   title: 'Action',
    //   renderComponent: RepaymentButtonComponent,
    //   type: 'custom',
    //   filter:false,
    // },
  }

  constructor(
    private seo: SeoService,
    private loanService: LoanService,
    private _decimalPipe:DecimalPipe,
    private messageService:MessageService,
    private userService:UserService,
  ) { 
    this.messageService.getMessage.subscribe((data:UserDto) => {
      this.getSingleUser(data?.id);
    });
  }


  ngOnInit() {
    this.seo.setSeoData('User Loan  Management', 'Manage application users');
  }

  requestData(data?: any) {
    this.isLoadingData = true;
    this.loanService.getAllLoan(this.userId, data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          
          if (response) {
            this.loans = GetUniqueArray([...(response.content ?? [])], [...this.loans]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

  async getSingleUser(userId:any) {
    this.userService.getSingleUser(userId).subscribe(
      (result) => {
        this.user = result.content[0];   
        this.userId = this.user.id;
        this.requestData()
        
      })
  }
}
