import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  users: { name: string, title: string }[] = [
    { name: ' Loan Application', title: 'Your application has been submitted successfully' },
    { name: 'Bob Kelso Loan Application', title: 'Your application has been submitted successfully' },
    { name: 'Janitor Loan Application', title: 'Your application has been submitted successfully' },
    { name: 'Perry Cox Loan Application', title: 'Your application has been submitted successfully' },
    { name: 'Ben Sullivan Loan Application', title: 'Your application has been submitted successfully' },
  ];
  constructor() { }

  ngOnInit(): void {
    console.log('')
  }

}
