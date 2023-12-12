import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  filterFn = (date:any) => date.getDay() < Date.now();

  @Input() context = '';
  @Input() title = '';
  user: any = {};
  userId:any;
  selectedItem = '2';
  selectedEmpStatus = ''
  selectedProduct = ''
  selectedMonth = ''

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  userData:any = [];
  loanProducts: LoanProductDto[] = [];

  employments = Employments;
  months: any[] = Months;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];

  constructor(
    private fb: FormBuilder,
     private userService:UserService,  
     private shareDataservice: ShareDataService,
     private secureLs: SecureLocalStorageService,) { 
    this.firstForm = this.fb.group({
      fullname: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      employmentStatus: ['', Validators.required],
      employer: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      paymentAmount: [''],
      paymentDate: [''],
      amount: ['', Validators.required],

    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
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
  setSelectEmployment(){
    console.log("change trigger", this.firstForm.value);

  }
  async getSingleUser() {
    this.userService.getSingleUser(this.userId).subscribe(
      (result) => {
        this.userData = result.content[0];
        this.setUSerData();
      })
  }

  setUSerData() {
    this.firstForm.setValue({
      fullname: `${this.userData.firstName} ${this.userData.lastName}`, 
      email: this.userData.email,
      employmentStatus:"",
      employer: ""
    });
  }

  ngOnInit(): void {
    const token = this.secureLs.get<TokenExport>(LocalStorageKey.JWT.toString());
    const user:any = helper.decodeToken(token.token) as JwtPayloadModel;
    this.userId = user['id'];
    this.getSingleUser();
    this.getAllProducts();
  }
  onFirstSubmit() {
    this.firstForm.markAsDirty();
    console.log("log: ", this.firstForm.value.employmentStatus);
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
    console.log("log 1: ", this.firstForm.value);

    console.log("log 2: ", this.secondForm.value);

  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
    console.log("log 1: ", 
    this.firstForm.value,
    this.secondForm.value,
    this.thirdForm.value

    );

  }
}
