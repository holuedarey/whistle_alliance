import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="caption">
      Power by Whistle Alliance ${new Date().getFullYear()}
    </span>
  `,
})
export class FooterComponent {
}
