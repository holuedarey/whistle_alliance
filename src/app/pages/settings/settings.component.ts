import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/data-services/auth.service';
import { ShareDataService } from 'src/app/@core/data-services/share-data.service';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: any = {};
  contactForm: any = {};

  menu = [
    // "Bank Account",
    //  "Card", 
    "Change Password",
    "Contact Us"];
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

  constructor(private authService: AuthService, private shareData:ShareDataService, private router:Router) { }

  ngOnInit(): void {
    this.changePassword = true;
  }

  async changeView(item: any, event: any) {
    event.preventDefault();
    console.log("Logging ::", item)

    switch (item) {
      case 'Bank Account':
        this.bankAccount = true;
        this.card = false;
        this.changePassword = false;
        this.contactUs = false;
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
        this.changePassword = false;
        this.contactUs = true;
        break;
      default:
        this.changePassword = true;
        break;
    }
  }

  async startProcess(value: string) {
    console.log(value)
  }
  changePasswordAction() {
    
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const passwords: any = {
      confirmPassword: this.user.confirmpassword,
      password: this.user.confirmpassword,
      updateType: "ACCOUNT"
    };

   
    this.authService.updatePassword(passwords).subscribe(
      (result) => {
        this.submitted = false;
        this.user = {};
        if (result) {
          this.messages = ["Password Change Successfully"
          ];
          this.user = {};
          localStorage.clear();
          this.router.navigateByUrl('/')
        }
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
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
    this.shareData.sendNotification(contactForm).subscribe(
      (result) => {
        this.submitted = false;
        this.user = {};
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

}
