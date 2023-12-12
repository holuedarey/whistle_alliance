import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatService {

  isOnlineSub: BehaviorSubject<boolean>;

  constructor() {
    this.isOnlineSub = new BehaviorSubject<boolean>(navigator.onLine);
    this.pingServerPeriodically();
  }

  updateOnlineStatus(status: boolean): void {
    this.isOnlineSub.next(status);
  }

  pingServerPeriodically(): any {
    return fetch(environment.apiUrl)
      .then((serverResponse) => {        
        if (serverResponse.status >= 200 && serverResponse.status < 500) {
          this.isOnlineSub.next(true);
          setTimeout(() => this.pingServerPeriodically(), 15000)
        } else {
          this.isOnlineSub.next(false);
          setTimeout(() => this.pingServerPeriodically(), 2000)
        }
      })
      .catch(() => {
        this.isOnlineSub.next(false)
        setTimeout(() => this.pingServerPeriodically(), 2000)
      })
  }

}
