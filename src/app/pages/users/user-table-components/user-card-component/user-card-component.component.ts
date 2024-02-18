import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { createDecipheriv } from 'crypto';
import { ViewCell } from 'ng2-smart-table';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/@core/data-services/message.service';
import { UserService } from 'src/app/@core/data-services/user.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { ConfirmationDialogComponent } from 'src/app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { PagesResources, PagesResourcesNavMap } from 'src/app/pages/pages-resources';

@Component({
  selector: 'app-user-card-component',
  templateUrl: './user-card-component.component.html',
  styleUrls: ['./user-card-component.component.scss']
})
export class UserCardComponentComponent implements OnInit, OnDestroy {

  userData!: any;
  fullname: string = "";
  createdDate: any;
  show: boolean = false;

  isSubmitted:boolean = false;
  @Input() history: any

  checked:boolean = false;  

  userId:any;

  constructor(
    private messageService: MessageService, 
    private userService: UserService,
    private dialogService: NbDialogService,
    private cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    ) {

    this.messageService.getMessage.subscribe((data:any) => {
      this.userId = data?.id;
      if(this.userId){
        this.getSingleUser(data?.id);
      }else{
        this.userId = this.activatedRoute.snapshot.queryParams.user;
        this.getSingleUser(this.userId);
      }
    });
  }

  gotoUserTrans(){
    return this.router.navigate(
      [PagesResourcesNavMap.get(PagesResources.UserTransactionHistoryView)?.route as string],
      {
        queryParams: { user: this.userId },
      }
    );
  }
  ngOnInit(): void {
    this.show = this.history ? true : false;
  }

  ngOnDestroy(): void {
    this.show = false;

  }
  async getSingleUser(userId: any) {
    this.userService.getSingleUser(userId).subscribe(
      (result) => {
        this.userData = result.content[0];
        this.checked = this.userData.active;
        this.fullname = this.userData?.firstName + ' ' + this.userData?.lastName;
        this.createdDate = `Account Created ${new Date(this.userData?.createdDate ?? "").toDateString()}`;
        this.show = true;
      })
  }


  async onStatusChange(state: boolean) {
    this.isSubmitted = true;
    this.cd.detectChanges();
    const confirmed = await this.dialogService.open(
      ConfirmationDialogComponent,
      {
        context: {
          context: `Are you sure you wish to proceed?`,
          title: `${state ? 'Enable' : 'Disable'} User`
        },
      })
      .onClose.toPromise();

    if (confirmed) {
      const payload = {
        "lock": state,
        "active": state,
        "updateType": "ACCOUNT_STATUS"
      }
      of(state)
        .pipe(switchMap((state) => {
          if (state) {
            return this.userService.enableDisableUser(this.userId, payload)
          }
          return this.userService.enableDisableUser(this.userId, payload)
        }))
        .subscribe(
          (response) => {
            if (response.status) {
            this.toastr.success('Status update successful', 'User Update', { position: NbGlobalPhysicalPosition.BOTTOM_RIGHT })
              this.isSubmitted = false;
              this.checked = state;
              this.cd.detectChanges();
            } else {
              this.errorResponse(state, true, response.message);
            }
          },
          (error) => {
            console.log("got to error", error);
            
            this.errorResponse(state);
          }
        )
    } else {
      console.log("not confirmed error");
      
      this.errorResponse(state, false);
    }
  }

  errorResponse(state: boolean, showToaster = true, message?: string) {
    this.isSubmitted = false;
    this.checked = !state;
    this.cd.detectChanges();
    if (showToaster) {
      this.toastr.danger(
        `${message ? message : 'An error occured during execution'}`,
        'User Update',
        { position: NbGlobalPhysicalPosition.BOTTOM_RIGHT, duration: 3000 }
      );
    }
  }
}
