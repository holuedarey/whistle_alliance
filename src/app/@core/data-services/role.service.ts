import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from './../dtos/response-dto';
import { environment } from './../../../environments/environment';
import { AppRoleDto } from './../dtos/role.dto';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAppRoles(): Observable<ResponseDto<AppRoleDto[]>> {
        const apiEndpoint = 'roles';
        return this.httpClient.get<ResponseDto<AppRoleDto[]>>(`${environment.apiUrl}/${apiEndpoint}`);
    }

    getSsoRoles(): Observable<ResponseDto<string[]>> {
        const apiEndpoint = 'roles/ssoRoles';
        return this.httpClient.get<ResponseDto<string[]>>(`${environment.apiUrl}/${apiEndpoint}`);
    }
}