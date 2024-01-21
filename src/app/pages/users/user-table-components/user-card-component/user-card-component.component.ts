import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { createDecipheriv } from 'crypto';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/@core/data-services/message.service';
import { UserService } from 'src/app/@core/data-services/user.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { ConfirmationDialogComponent } from 'src/app/@theme/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-card-component',
  templateUrl: './user-card-component.component.html',
  styleUrls: ['./user-card-component.component.scss']
})
export class UserCardComponentComponent implements OnInit, OnDestroy {

  rowData!: UserDto;
  userData!: UserDto;
  fullname: string = "";
  createdDate: any;
  show: boolean = false;
  isSubmitted:boolean = false;
  @Input() history: any
  checked:boolean = false;  
  constructor(
    private messageService: MessageService, 
    private userService: UserService,
    private dialogService: NbDialogService,
    private cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    ) {

    this.messageService.getMessage.subscribe((data: UserDto) => {
      this.getSingleUser(data?.id);
    });
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
        this.checked = this.userData.isActive;
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
      of(state)
        .pipe(switchMap((state) => {
          if (state) {
            return this.userService.enableUser(this.rowData.id)
          }
          return this.userService.disableUser(this.rowData.id)
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
            this.errorResponse(state);
          }
        )
    } else {
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
