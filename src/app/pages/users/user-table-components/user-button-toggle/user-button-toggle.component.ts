import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/@core/data-services/user.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';
import { ConfirmationDialogComponent } from 'src/app/@theme/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-button-toggle',
  templateUrl: './user-button-toggle.component.html',
  styleUrls: ['./user-button-toggle.component.scss']
})
export class UserButtonToggleComponent implements ViewCell, OnInit {

  isSubmitted = false;

  @Input() value!: string | number;
  @Input() rowData!: UserDto;


  constructor(
    private dialogService: NbDialogService,
    public userService: UserService,
    public onlineStat: OnlineStatService,
    private cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    public accessChecker: NbAccessChecker,
  ) { }

  ngOnInit(): void {
  }

  async onButtonClick() {
    this.isSubmitted = true;
    this.cd.detectChanges();
    console.log("row", this.rowData );

    
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
              // this.checked = state;
              this.cd.detectChanges();
            } else {
              // this.errorResponse(state, true, response.message);
            }
          },
          (error) => {
            // this.errorResponse(state);
          }
        )
    } else {
      // this.errorResponse(state, false);
    }
  }

}
