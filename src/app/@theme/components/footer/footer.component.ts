import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="caption">
       ⁠Copyright &copy; Whistles Alliance {{date}}
    </span>
  `,
})
export class FooterComponent {
  date:any = new Date().getFullYear()
}
