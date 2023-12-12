import { AnimationOptions } from 'ngx-lottie';
import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-unauthorised',
  templateUrl: './unauthorised.component.html',
  styleUrls: ['./unauthorised.component.scss']
})
export class UnauthorisedComponent {

  options: AnimationOptions = {
    path: '/assets/animations/27608-security-lock.json'
  };

  constructor() { }

  animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(0.5);
    // setTimeout(() => {
    // animationItem.goToAndStop(animationItem.firstFrame + animationItem.totalFrames-1, true);
    // }, 3000);
  }

}
