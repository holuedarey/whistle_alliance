import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { ShareDataService } from 'src/app/@core/data-services/share-data.service';
import { LoanProductRequestDto } from 'src/app/@core/dtos/loan-product-request.dto';
import { LoanProductDto } from 'src/app/@core/dtos/loan-product.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  errors:any[] = [];
  messages:any[] = [];
  submitted:boolean = true;
  loanProducts:LoanProductDto[] = [];
  createproduct:any = {}

  constructor( public shareDataservice: ShareDataService, private loanService:LoanService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  async getAllProducts() {
    this.errors = [];
    this.messages = [];
    this.submitted = false;

    this.shareDataservice.getAllProduct().subscribe(
      (result) => {
        this.submitted = false;
        this.loanProducts = result.content ?? [];
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        this.errors = [
          'An Error occured while logging you in.',
        ];
      }
    );
  }

  async addLoanProduct() {
    this.errors = [];
    this.messages = [];
    this.submitted = false;

    const laonProductReqDto: LoanProductRequestDto
     = {
      expireDate: this.createproduct.expiredate,
      isActive: true,
      maxAmount: this.createproduct.minamount,
      minAmount: this.createproduct.maxamount,
      productDescription: this.createproduct.description,
      productExpires: false,
      productName: this.createproduct.productname,
      rate: this.createproduct.rate
    };
    this.loanService.createLoanProduct(laonProductReqDto).subscribe(
      (result) => {
        this.submitted = false;
        this.createproduct = {};
        if (result) {
          this.messages = [ "Loan Product Create Successfully"
          ];
          this.getAllProducts();
          this.createproduct = {};
        }
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        this.errors = [
          'An Error occured while Creating Loan Product.',
        ];
      }
    );
  }
}
