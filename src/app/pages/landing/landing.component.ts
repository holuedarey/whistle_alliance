import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Granim from 'granim';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { SeoService } from 'src/app/@core/utils/seo.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  granimInstance: any;

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setSeoData('Home', 'Landing Page');
  }

  ngOnDestroy(): void {
  }

}
