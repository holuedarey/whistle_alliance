import { Injectable } from '@angular/core';
import { NbRoleProvider } from '@nebular/security';
import { Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleProvider implements NbRoleProvider {

  constructor(private tokenService: TokenService) { }

  getRole(): Observable<string[] | string> {
    return of(this.getRoleSync());
  }

  getRoleSync() {
    const payload = this.tokenService.getPayload();
    if (payload) {
      try {
        const user = payload as any;
        return user.roles.map((item:any) => item.name)
      } catch (error) {
        return ['guest'];
      }
    }
    return ['guest'];
  }
}
