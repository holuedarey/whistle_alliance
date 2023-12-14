import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoanService } from 'src/app/@core/data-services/loan.service';
import { ShareDataService } from 'src/app/@core/data-services/share-data.service';
import { UserService } from 'src/app/@core/data-services/user.service';
import { LoanProductDto } from 'src/app/@core/dtos/loan-product.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { Employments } from 'src/app/@core/enums/employment-list.enum';
import { LocalStorageKey } from 'src/app/@core/enums/local-storage-key.enum';
import { Months } from 'src/app/@core/enums/month-of-year.enum';
import { JwtPayloadModel } from 'src/app/@core/models/jwt-payload-model';
import { TokenExport } from 'src/app/@core/utils/custom-token-storage/custom-token-storage.module';
import { SecureLocalStorageService } from 'src/app/@core/utils/secure-local-storage.service';
const helper = new JwtHelperService();

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.scss'],
  providers: [FormBuilder]
})
export class LoanApplicationComponent implements OnInit {

  filterFn = (date: any) => date.getDay() < Date.now();

  @Input() context = '';
  @Input() title = '';
  user: any = {};
  userId: any;
  selectedItem = '2';
  selectedEmpStatus = ''
  selectedProduct = ''
  selectedMonth = ''

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  userData: any = [];
  loanProducts: any[] = [];

  employments = Employments;
  months: any[] = Months;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];

  address: any;
  pofIdentity: any = null;
  pofEmployment: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private shareDataservice: ShareDataService,
    private loanservice: LoanService,
    private secureLs: SecureLocalStorageService,) {
    this.firstForm = this.fb.group({
      fullname: [{ value: '', disabled: false }, Validators.required],
      email: [{ value: '', disabled: false }, Validators.required],
      employmentStatus: ['', Validators.required],
      employer: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      productType: ['', Validators.required],
      tenure: ['', Validators.required],
      amount: ['', Validators.required],

    });

    this.thirdForm = this.fb.group({
      address: ['', Validators.required],
      pofIdentity: ['', Validators.required],
      pofEmployment: ['', Validators.required],
    });
  }

  getAllProducts(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = false;

    this.shareDataservice.getAllProduct().subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.loanProducts = result.content;
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
  onChangeFile(event: any, name: string) {
    switch (name) {
      case 'address':
        return this.address = event.target.files[0];
        break;
      case 'identity':
        return this.pofIdentity = event.target.files[0];
      case 'employement':
        return this.pofEmployment = event.target.files[0];
      default:
        return this.address = event.target.files[0];
        break;
    }

  }
  async getSingleUser() {
    this.userService.getSingleUser(this.userId).subscribe(
      (result) => {
        this.userData = result.content[0];
        this.setUSerData();
      })
  }

  setUSerData() {
    this.firstForm.patchValue({
      fullname: `${this.userData.firstName} ${this.userData.lastName}`,
      email: this.userData.email

    });
  }

  ngOnInit(): void {
    const token = this.secureLs.get<TokenExport>(LocalStorageKey.JWT.toString());
    const user: any = helper.decodeToken(token.token) as JwtPayloadModel;
    this.userId = user['id'];
    this.getSingleUser();
    this.getAllProducts();
  }
  onFirstSubmit() {
    this.firstForm.markAsDirty();
    // console.log("log firstForm : ", this.firstForm.value);
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
    // console.log("log 1: ", this.firstForm.value);

    // console.log("log 2: ", this.secondForm.value);

  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
    

    const formData = new FormData();
    // Store form name as "file" with file data 
    formData.append("amount", this.secondForm.value.amount);
    formData.append("month", this.secondForm.value.tenure);
    // formData.append("name", this.firstForm.value.fullname);
    formData.append("loanProductId", this.secondForm.value.productType);
    formData.append("proofOfAddress", this.address, this.address.name);
    formData.append("proofOfEmployment", this.pofEmployment, this.pofEmployment.name);
    formData.append("proofOfIdentity", this.pofIdentity, this.pofIdentity.name);

    var formdata = new FormData();
    formdata.append("amount", "100000");
    formdata.append("month", "10");
    formdata.append("loanProductId", "2");
    formdata.append("proofOfEmployment", this.pofEmployment, this.pofEmployment.name);
    formdata.append("proofOfIdentity", this.pofIdentity, this.pofIdentity.name);
    formdata.append("proofOfAddress", this.address, this.address.name);
    // console.log("Form Data", formData)

    this.loanservice.createLoan(formData).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['Loan Created Successfully'];
    
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        console.log("Error from serer: ", error);
        
        this.errors = [
          'An Error occured while logging you in.',
        ];
      }
    );

  }
}
