import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
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
import { AppResources, AppResourcesNavMap } from 'src/app/app-resources';
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

  isShowModal:boolean = true;
  showMessages: any = {};

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private shareDataservice: ShareDataService,
    private loanservice: LoanService,
    private router: Router,
    private toastr:NbToastrService,
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
    this.submitted = true;

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
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const formData = new FormData();
    // Store form name as "file" with file data 
    formData.append("amount", this.secondForm.value.amount.replace(/[\s,]/g, ''));
    formData.append("month", this.secondForm.value.tenure);
    formData.append("name", `${this.userData.firstName} ${this.userData.lastName}`);
    formData.append("employerName", this.firstForm.value.employer);
    formData.append("employmentStatus", this.firstForm.value.employmentStatus);

    formData.append("loanProductId", this.secondForm.value.productType);
    formData.append("proofOfAddress", this.address, this.address.name);
    formData.append("proofOfEmployment", this.pofEmployment, this.pofEmployment.name);
    formData.append("proofOfIdentity", this.pofIdentity, this.pofIdentity.name);

    this.loanservice.createLoan(formData).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['Loan Created Successfully'];
          this.toastr.success('Loan Application', 'Loan Created Successfully', { position: NbGlobalPhysicalPosition.TOP_RIGHT })
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
          'An Error occured while creating Loan.',
        ];
      }
    );

  }

  numberFormatComma() {
    return this.secondForm.patchValue({
      amount: this.secondForm.value.amount.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    })
  }


  complete() {
    this.isShowModal = !this.isShowModal;
    this.router.navigateByUrl(AppResourcesNavMap.get(AppResources.AppView)?.route as string);

  }
}
