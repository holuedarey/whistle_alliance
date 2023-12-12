import {Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/@core/utils';

@Component({
  selector: 'app-nin',
  templateUrl: './nin.component.html',
  styleUrls: ['./nin.component.scss', '../landing.component.scss']
})
export class NinComponent implements OnInit {
  redirectDelay = 0;
  showMessages: any = {};

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  rememberMe = true;
  constructor(private seo:SeoService) {  }

  ngOnInit(): void {
    this.seo.setSeoData('Get started', 'Enter your Nin to create your Application');
  }

}
