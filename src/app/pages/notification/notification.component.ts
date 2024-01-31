import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/@core/data-services/notification.service';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications:any[] = [];
  isLoadingData:boolean = false;
  users: { name: string, title: string }[] = [
    { name: ' Loan Application', title: 'Your application has been submitted successfully' },
    { name: 'Bob Kelso Loan Application', title: 'Your application has been submitted successfully' },
    { name: 'Janitor Loan Application', title: 'Your application has been submitted successfully' },
    { name: 'Perry Cox Loan Application', title: 'Your application has been submitted successfully' },
    { name: 'Ben Sullivan Loan Application', title: 'Your application has been submitted successfully' },
  ];
  constructor(private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.requestData()
  }
  requestData(data?: any) {
    this.isLoadingData = true;
    this.notificationService.getAllNotification(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.notifications = GetUniqueArray([...(response.content ?? [])], [...this.notifications]);
            console.log(this.notifications);
            
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

}
