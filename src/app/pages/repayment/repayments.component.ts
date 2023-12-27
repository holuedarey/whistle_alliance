import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService, } from '@nebular/theme';
import { RoleService } from 'src/app/@core/data-services/role.service';
import { UserService } from 'src/app/@core/data-services/user.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { PermissionEnum } from 'src/app/@core/enums/permission.enum';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { RoleMap } from 'src/app/@core/maps/role.map';
import { SeoService } from 'src/app/@core/utils';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';
import { PermissionService } from 'src/app/@core/utils/permission.service';
import { RepaymentResources } from './repayments-resources';

@Component({
  selector: 'app-repayment',
  templateUrl: './repayments.component.html',
  styleUrls: ['./repayments.component.scss']
})
export class RepaymentComponent implements OnInit {

  RepaymentResources = RepaymentResources;
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
    phone: {
      title: 'Phone Nos',
    },
    roleId: {
      title: 'Function',
      filter: {
        type: 'list',
        config: {
          selectText: 'Loading...',
          list: []
        },
      },
      valuePrepareFunction: (d: string, r: any) => {
        return r.role
      },
      filterFunction: (x: string, y: string) => {
        return x.toLowerCase() === y.toLowerCase();
      }
    },
    ssoRole: {
      title: 'Role',
      filter: {
        type: 'list',
        config: {
          selectText: 'Select...',
          list: Array.from(RoleMap.entries())
            .map(x => ({ value: x[0], title: x[1] }))
            .filter(r => this.permissionService.canAccessByResource('view', RepaymentResources.ViewAllRoles) ? true : !r.value.includes('vgg')),
        },
      },
      valuePrepareFunction: (d: string) => RoleMap.get(d.toLowerCase())
    },
    clientId: {
      title: 'Client',
      filter: {
        type: 'list',
        config: {
          selectText: 'Loading...',
          list: []
        },
      },
      valuePrepareFunction: (d: string, r: any) => {
        return r.client
      },
      hide: !this.permissionService.canAccessByResource(PermissionEnum.View, RepaymentResources.ViewClientColumn)
    },
    status: {
      title: 'Status',
      renderComponent: `<h1></h1>`,
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

  // async createUser() {
  //   const user: UserDto = await this.dialogService.open(UserFormComponent, {
  //     closeOnBackdropClick: false,
  //     context: { isCreateRequest: true },
  //     closeOnEsc: false,
  //     hasScroll: true,
  //   }).onClose.toPromise();
  //   if (user) {
  //     this.users = [user, ...this.users];
  //   }
  // }

  // async updateUser({ data }: { data: UserDto }) {
  //   const hasPermission = this.permissionService.canAccessByResource('update', 'users:update-' + data.ssoRole.toLowerCase())
  //   if (hasPermission) {
  //     const user: UserDto = await this.dialogService.open(`<h1></h1>`, {
  //       closeOnBackdropClick: false,
  //       context: { isCreateRequest: false, userForUpdate: (data) },
  //       hasScroll: true,
  //       closeOnEsc: false
  //     }).onClose.toPromise();
  //     if (user) {
  //       this.users = GetUniqueArray([user], [...this.users], true);
  //     }
  //   } else {
  //     this.toastr.danger(
  //       'You do not have permission to update this user',
  //       'UNAUTHORISED',
  //       {
  //         position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
  //         preventDuplicates: true
  //       }
  //     );
  //   }
  // }

  ngOnInit() {
    this.seo.setSeoData('User Management', 'Manage application users');
    this.requestData();
    this.getAppRoles();
    this.getClients();
  }

  requestData(data?: any) {
    this.isLoadingData = true;
    this.userService.getUsers(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.users = GetUniqueArray([...(response.data?.itemList ?? [])], [...this.users]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

  getAppRoles() {
    this.roleService.getAppRoles()
      .subscribe(
        (data) => {
          const roles = data.data ?? [];
          const roleSearchFilterList = roles.map(r => ({ value: r.id, title: r.name }));
          this.columns.roleId.filter.config.selectText = 'Select...';
          this.columns.roleId.filter.config.list = roleSearchFilterList as any;
          this.columns = { ...this.columns }
        }
      )
  }

  getClients() {
   return [];
  }

}
