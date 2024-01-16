import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService, } from '@nebular/theme';
import { ClientService } from 'src/app/@core/data-services/client.service';
import { RoleService } from 'src/app/@core/data-services/role.service';
import { UserService } from 'src/app/@core/data-services/user.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { PermissionEnum } from 'src/app/@core/enums/permission.enum';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { RoleMap } from 'src/app/@core/maps/role.map';
import { SeoService } from 'src/app/@core/utils';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';
import { PermissionService } from 'src/app/@core/utils/permission.service';
import { UserFormComponent } from './user-form/user-form.component';
import { UserStatusToggleComponent } from './user-table-components/user-status-toggle/user-status-toggle.component';
import { UsersResources } from './users-resources';
import { UserButtonToggleComponent } from './user-table-components/user-button-toggle/user-button-toggle.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersResources = UsersResources;
  isLoadingData = true;

  users: UserDto[] = [];

  columns = {
    firstName: {
      title: 'First Name',
    },
    lastName: {
      title: 'Last Name',
    },
    email: {
      title: 'Email',
    },
    phoneNumber: {
      title: 'Phone Nos',
    },
    isActive: {
      title: 'Status',
      renderComponent: UserStatusToggleComponent,
      type: 'custom',
      filter: {
        type: 'list',
        config: {
          selectText: 'Select...',
          list: [
            { value: 'Active', title: 'Active' },
            { value: 'InActive', title: 'Inactive' },
          ],
        },
      },
      filterFunction: (x: string, y: string) => x.toLowerCase() === y.toLowerCase()
    },
    action: {
      title: 'Action',
      renderComponent: UserButtonToggleComponent,
      type: 'custom',
      filter:false,
    },
  }

  constructor(
    private dialogService: NbDialogService,
    private seo: SeoService,
    public onlineStat: OnlineStatService,
    private userService: UserService,
    public permissionService: PermissionService,
    private roleService: RoleService,
    private toastr: NbToastrService
  ) { }

  async createUser() {
    const user: UserDto = await this.dialogService.open(UserFormComponent, {
      closeOnBackdropClick: false,
      context: { isCreateRequest: true },
      closeOnEsc: false,
      hasScroll: true,
    }).onClose.toPromise();
    if (user) {
      this.users = [user, ...this.users];
    }
  }

  async updateUser({ data }: { data: UserDto }) {
    const hasPermission = this.permissionService.canAccessByResource('update', 'users:update-' + data.ssoRole.toLowerCase())
    if (hasPermission) {
      const user: UserDto = await this.dialogService.open(UserFormComponent, {
        closeOnBackdropClick: false,
        context: { isCreateRequest: false, userForUpdate: (data) },
        hasScroll: true,
        closeOnEsc: false
      }).onClose.toPromise();
      if (user) {
        this.users = GetUniqueArray([user], [...this.users], true);
      }
    } else {
      this.toastr.danger(
        'You do not have permission to update this user',
        'UNAUTHORISED',
        {
          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
          preventDuplicates: true
        }
      );
    }
  }

  ngOnInit() {
    this.seo.setSeoData('User Management', 'Manage application users');
    this.requestData();
  }

  rowSelect(data:any){
    console.log("data", data);
    
  }
  requestData(data?: any) {
    this.isLoadingData = true;
    this.userService.getUsers(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.users = GetUniqueArray([...(response?.content ?? [])], [...this.users]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

}
