import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-out',
  styleUrls: ['./slide-out.component.scss'],
  templateUrl: './slide-out.component.html',
})
export class SlideOutComponent {

  @Input() show: boolean = false;

  toggleStatistics() {
    this.show = !this.show;
  }
}
