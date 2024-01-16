import { Injectable } from '@angular/core';
import { NbAclService } from '@nebular/security';
import { GlobalResources } from '../maps/global-resources';
import { RoleProvider } from './role-provider.service';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private accessChecker: NbAclService,
    private roleProvider: RoleProvider
  ) { }

  canCreate(route: string): boolean {
    return this.canAccessByRoute(route, 'create');
  }

  canView(route: string): boolean {
    return this.canAccessByRoute(route, 'view');
  }

  canUpdate(route: string): boolean {
    return this.canAccessByRoute(route, 'update');
  }

  canDelete(route: string): boolean {
    return this.canAccessByRoute(route, 'delete');
  }

  private canAccessByRoute(route: string, permission: string): boolean {
    const role = this.roleProvider.getRoleSync();

    const resource = Array.from(GlobalResources.entries())
      .find(p => p[1].route === route)?.[0];
    if (resource) {
      return this.accessChecker.can(role[0], permission, resource) || this.accessChecker.can(role[1], permission, resource);
    } else {
      return false;
    }
  }

  canAccessByResource(permission: string, resource: string): boolean {
    const role = this.roleProvider.getRoleSync();
    if (resource) {
      return this.accessChecker.can(role[0], permission, resource) || this.accessChecker.can(role[1], permission, resource);
    } else {
      return false;
    }
  }
  canAccessMenu(resource: string, permission: string): boolean {
    const role = this.roleProvider.getRoleSync();

    const generalroutes = [
        '/app/config',
        '/app/notification',
    ]
    const adminRoutes: any[] = [
      '/app/admin/overview',
      '/app/admin/loan',
      '/app/admin/loan-products',
      '/app/admin/users',
      ...generalroutes
    ]
   

    const userRoutes: any[] = [
      '/app/repayment',
      '/app/dashboard',
      ...generalroutes
    ]
    if (role.includes('ADMIN')) {
      if (role.includes(permission) && adminRoutes.includes(resource)) {
        return true;
      }
    } else if (role.includes('USER')) {
      if (role.includes(permission) && userRoutes.includes(resource)) {
        return true;
      }
    }
    return false;
  }
}
