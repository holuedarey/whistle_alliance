import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private message = new BehaviorSubject({
    // firstName: "",
    // lastName: "",
    // email: "",
    // phoneNumber: "",
    // status: "",
    // ssoUserId: "",
    // ssoRole: "",
    // role: "",
    // client: "",
    // clientId: "",
    // roleId: "",
    // deActivatedBy: null,
    // dateDeactivated: null,
    // id: "",
    // createdDate: "",
    // active: true,
    // dateOfBirth:"",
    // loanSummary:""
  });
  
  getMessage = this.message.asObservable();


  constructor() { }


  setMessage(message:any){
    this.message.next(message)
  }

}
