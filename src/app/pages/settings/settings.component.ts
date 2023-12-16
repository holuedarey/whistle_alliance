import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user:any = {};
  contactForm:any = {};

  menu =  ["Bank Account", "Card", "Change Password", "Contact Us" ];
  isPasswordHidden = false;
  bankAccount:boolean = false;
  bankAccountData:any[] = [];

  card:boolean = false;
  cardData:any[] = [];

  changePassword:boolean = false;

  contactUs:boolean = false;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.bankAccount = true;
  }

 async changeView(item:any, event:any){
  event.preventDefault();
  console.log("Logging ::", item)

  switch (item) {
    case 'Bank Account':
      this.bankAccount = true;
      this.card = false;
      this.changePassword= false;
      this.contactUs = false;
      break;
    case 'Card':
      this.bankAccount = false;
      this.card = true;
      this.changePassword= false;
      this.contactUs = false;
      break;
    case 'Change Password':
      this.bankAccount = false;
      this.card = false;
      this.changePassword= true;
      this.contactUs = false;
      break;
    case 'Contact Us':
      this.bankAccount = false;
      this.card = false;
      this.changePassword= false;
      this.contactUs = true;   
      break;
    default:
      this.bankAccount = true;
      break;
  }
 }

 async startProcess(value:string){
  console.log(value)
 }
 changePasswordAction(){}
 ccontactUsAction(){}

}
