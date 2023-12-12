import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss', '../landing.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  redirectDelay = 0;
  showMessages: any = {};

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  rememberMe = true;
  constructor() { }

  ngOnInit(): void {
  }

}
