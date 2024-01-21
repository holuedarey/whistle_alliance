import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private message = new BehaviorSubject({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "",
    ssoUserId: "",
    ssoRole: "",
    role: "",
    client: "",
    clientId: "",
    roleId: "",
    deActivatedBy: null,
    dateDeactivated: null,
    id: "",
    createdDate: "",
    active: true
  });
  
  getMessage = this.message.asObservable();


  constructor() { }


  setMessage(message:any){
    this.message.next(message)
  }

}
