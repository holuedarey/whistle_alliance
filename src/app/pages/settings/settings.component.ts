import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/data-services/auth.service';
import { ShareDataService } from 'src/app/@core/data-services/share-data.service';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { NbIconLibraries } from '@nebular/theme';
import { RoleProvider } from 'src/app/@core/utils/role-provider.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/@core/data-services/user.service';
import { log } from 'console';
import { TokenExport } from 'src/app/@core/utils/custom-token-storage/custom-token-storage.module';
import { LocalStorageKey } from 'src/app/@core/enums/local-storage-key.enum';
import { JwtPayloadModel } from 'src/app/@core/models/jwt-payload-model';
import { SecureLocalStorageService } from 'src/app/@core/utils/secure-local-storage.service';
const helper = new JwtHelperService();

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: any = {};
  contactForm: any = {};

  menu = [
    "Bank Account",
    //  "Card", 
    "Change Password"];
  isPasswordHidden = false;
  isPasswordHiddenConf = false;
  bankAccount: boolean = false;
  bankAccountData: any[] = [];

  card: boolean = false;
  cardData: any[] = [];

  changePassword: boolean = false;

  contactUs: boolean = false;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];

  submittedPass = false;
  errorsPass: string[] = [];
  messagesPass: string[] = [];


  submittedBank = false;
  errorsBank: string[] = [];
  messagesBank: string[] = [];
  bankForm:any = {};

  public role = this.roleProvider.getRoleSync();

  userData :any;

  userId:any;

  isBank:any;

  constructor(
    private authService: AuthService,
    private shareData: ShareDataService,
    private router: Router,
    private iconLibraries: NbIconLibraries,
    private roleProvider: RoleProvider,
    private userService: UserService,
    private secureLs: SecureLocalStorageService,
  ) {
    this.iconLibraries.registerSvgPack('social-networks', {
      'instagram': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.68539 1.33383C9.17188 1.33196 9.65837 1.33685 10.1447 1.34849L10.2741 1.35316C10.4234 1.35849 10.5707 1.36516 10.7487 1.37316C11.4581 1.40649 11.9421 1.51849 12.3667 1.68316C12.8067 1.85249 13.1774 2.08183 13.5481 2.45249C13.887 2.78557 14.1493 3.18846 14.3167 3.63316C14.4814 4.05783 14.5934 4.54249 14.6267 5.25183C14.6347 5.42916 14.6414 5.57716 14.6467 5.72649L14.6507 5.85583C14.6626 6.34196 14.6677 6.82823 14.6661 7.31449L14.6667 7.81183V8.68516C14.6684 9.17165 14.6633 9.65814 14.6514 10.1445L14.6474 10.2738C14.6421 10.4232 14.6354 10.5705 14.6274 10.7485C14.5941 11.4578 14.4807 11.9418 14.3167 12.3665C14.1498 12.8117 13.8875 13.2149 13.5481 13.5478C13.2147 13.8867 12.8116 14.149 12.3667 14.3165C11.9421 14.4812 11.4581 14.5932 10.7487 14.6265C10.5707 14.6345 10.4234 14.6412 10.2741 14.6465L10.1447 14.6505C9.65837 14.6623 9.17188 14.6675 8.68539 14.6658L8.18806 14.6665H7.31539C6.8289 14.6681 6.34241 14.663 5.85606 14.6512L5.72673 14.6472C5.56847 14.6414 5.41024 14.6348 5.25206 14.6272C4.54273 14.5938 4.05873 14.4805 3.63339 14.3165C3.18851 14.1494 2.78555 13.887 2.45273 13.5478C2.11342 13.2147 1.85088 12.8115 1.68339 12.3665C1.51873 11.9418 1.40673 11.4578 1.37339 10.7485C1.36597 10.5903 1.3593 10.4321 1.35339 10.2738L1.35006 10.1445C1.33777 9.65815 1.33221 9.17166 1.33339 8.68516V7.31449C1.33153 6.82823 1.33642 6.34196 1.34806 5.85583L1.35273 5.72649C1.35806 5.57716 1.36473 5.42916 1.37273 5.25183C1.40606 4.54183 1.51806 4.05849 1.68273 3.63316C1.85031 3.18824 2.11337 2.78546 2.45339 2.45316C2.78599 2.11366 3.1887 1.85088 3.63339 1.68316C4.05873 1.51849 4.54206 1.40649 5.25206 1.37316L5.72673 1.35316L5.85606 1.34983C6.34218 1.33754 6.82845 1.33199 7.31473 1.33316L8.68539 1.33383ZM8.00006 4.66716C7.5584 4.66091 7.1199 4.74251 6.71004 4.90721C6.30019 5.0719 5.92716 5.31641 5.61262 5.62653C5.29809 5.93665 5.04833 6.30619 4.87785 6.71367C4.70737 7.12115 4.61959 7.55845 4.61959 8.00016C4.61959 8.44187 4.70737 8.87917 4.87785 9.28665C5.04833 9.69414 5.29809 10.0637 5.61262 10.3738C5.92716 10.6839 6.30019 10.9284 6.71004 11.0931C7.1199 11.2578 7.5584 11.3394 8.00006 11.3332C8.88411 11.3332 9.73196 10.982 10.3571 10.3569C10.9822 9.73173 11.3334 8.88388 11.3334 7.99983C11.3334 7.11577 10.9822 6.26793 10.3571 5.64281C9.73196 5.01768 8.88411 4.66716 8.00006 4.66716ZM8.00006 6.00049C8.26573 5.9956 8.52971 6.04369 8.77659 6.14197C9.02346 6.24024 9.24828 6.38672 9.43791 6.57286C9.62754 6.75899 9.77818 6.98105 9.88102 7.22606C9.98387 7.47106 10.0369 7.73411 10.0369 7.99982C10.0369 8.26554 9.98404 8.5286 9.88128 8.77364C9.77851 9.01868 9.62795 9.24079 9.43839 9.42699C9.24882 9.61318 9.02405 9.75974 8.77721 9.8581C8.53037 9.95645 8.2664 10.0046 8.00073 9.99983C7.47029 9.99983 6.96158 9.78911 6.58651 9.41404C6.21144 9.03897 6.00073 8.53026 6.00073 7.99983C6.00073 7.4694 6.21144 6.96069 6.58651 6.58561C6.96158 6.21054 7.47029 5.99983 8.00073 5.99983L8.00006 6.00049ZM11.5001 3.66716C11.285 3.67577 11.0816 3.76726 10.9325 3.92248C10.7833 4.07769 10.7001 4.28458 10.7001 4.49983C10.7001 4.71507 10.7833 4.92197 10.9325 5.07718C11.0816 5.23239 11.285 5.32389 11.5001 5.33249C11.7211 5.33249 11.933 5.2447 12.0893 5.08842C12.2456 4.93214 12.3334 4.72018 12.3334 4.49916C12.3334 4.27815 12.2456 4.06619 12.0893 3.90991C11.933 3.75363 11.7211 3.66583 11.5001 3.66583V3.66716Z" fill="black"/>
      </svg>
      `,
      'linkedin-my': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.6667 2C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667ZM12.3333 12.3333V8.8C12.3333 8.2236 12.1044 7.6708 11.6968 7.26322C11.2892 6.85564 10.7364 6.62667 10.16 6.62667C9.59333 6.62667 8.93333 6.97333 8.61333 7.49333V6.75333H6.75333V12.3333H8.61333V9.04667C8.61333 8.53333 9.02667 8.11333 9.54 8.11333C9.78754 8.11333 10.0249 8.21167 10.2 8.3867C10.375 8.56173 10.4733 8.79913 10.4733 9.04667V12.3333H12.3333ZM4.58667 5.70667C4.88371 5.70667 5.16859 5.58867 5.37863 5.37863C5.58867 5.16859 5.70667 4.88371 5.70667 4.58667C5.70667 3.96667 5.20667 3.46 4.58667 3.46C4.28786 3.46 4.00128 3.5787 3.78999 3.78999C3.5787 4.00128 3.46 4.28786 3.46 4.58667C3.46 5.20667 3.96667 5.70667 4.58667 5.70667ZM5.51333 12.3333V6.75333H3.66667V12.3333H5.51333Z" fill="black"/>
      </svg>
      `
    });
  }

  ngOnInit(): void {
    this.bankAccount = true;
    if(!this.role.includes('ADMIN')) {
      this.menu.push("Contact Us")
    }
    const token = this.secureLs.get<TokenExport>(LocalStorageKey.JWT.toString());
    const user: any = helper.decodeToken(token.token) as JwtPayloadModel;
    this.userId = user['id'];
    this.getSingleUser();
  }

  async changeView(item: any, event: any) {
    event.preventDefault();

    switch (item) {
      case 'Bank Account':
        this.card = false;
        this.changePassword = false;
        this.contactUs = false;
        this.bankAccount =  true;
        break;
      case 'Card':
        this.bankAccount = false;
        this.card = true;
        this.changePassword = false;
        this.contactUs = false;
        break;
      case 'Change Password':
        this.bankAccount = false;
        this.card = false;
        this.changePassword = true;
        this.contactUs = false;
        break;
      case 'Contact Us':
        this.bankAccount = false;
        this.card = false;
        this.changePassword = this.role.includes('ADMIN') ? true : false;
        this.contactUs = this.role.includes('ADMIN') ? false : true;
        break;
      default:
        this.bankAccount = true;
        break;
    }
  }

  changePasswordAction() {

    this.errorsPass = [];
    this.messagesPass = [];
    this.submittedPass = true;

    const passwords: any = {
      confirmPassword: this.user.confirmpassword,
      password: this.user.confirmpassword,
      updateType: "PASSWORD_CHANGE"
    };


    this.authService.updatePassword(passwords).subscribe(
      (result) => {
        this.submittedPass = false;
        this.user = {};
        if (result) {
          this.messagesPass = ["Password Change Successfully"
          ];
          this.user = {};
          localStorage.clear();
          this.router.navigateByUrl('/')
        }
      },
      (error: ResponseDto<string>) => {
        this.submittedPass = false;
        this.errors = [
          'An Error occured while changing the password.',
        ];
      }
    );
  }
  contactUsAction() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const contactForm: any = {
      message: this.contactForm.message,
      title: this.contactForm.title
    };
    this.shareData.contactUs(contactForm).subscribe(
      (result) => {
        this.submitted = false;
        this.contactForm = {};
        if (result) {
          this.messages = ["Feedback Submitted Successfully"
          ];
          this.contactForm = {};
        }
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        this.errors = [
          'An Error occured while sending Request',
        ];
      }
    );
  }

  async getSingleUser() {
    this.userService.getSingleUser(this.userId).subscribe(
      (result) => {
        this.userData = result.content[0];
        this.isBank = !!(this.userData.accountNumber && this.userData.bankName);
      })
  }


  async updateUserBank() {
    
    this.errorsBank = [];
    this.messagesBank = [];
    this.submittedBank = true;

    const bank: any = {
      accountNumber : this.bankForm.accountNumber,
      bankName : this.bankForm.bankName
    };
    this.userService.updateUserBank(bank).subscribe(
      (result) => {
        this.submittedBank = false;
        this.bankForm = {};
        if (result) {
          this.messagesPass = ["Bank Added Successfully"];
          this.getSingleUser();
        }
      },
      (error: ResponseDto<string>) => {
        this.submittedBank = false;
        this.errors = [
          'An Error occured while changing the password.',
        ];
      }
    );
  }
}
