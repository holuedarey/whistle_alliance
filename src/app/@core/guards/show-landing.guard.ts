import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppResources, AppResourcesNavMap } from 'src/app/app-resources';

@Injectable({
  providedIn: 'root'
})
export class ShowLandingGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: NbAuthService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated().pipe(
      map((isAuth) => {
        if (!isAuth) {
          return true;
        } else {
          this.router.navigateByUrl(AppResourcesNavMap.get(AppResources.AppView)?.route as string);
          return false;
        }
      })
    );
  }

}
