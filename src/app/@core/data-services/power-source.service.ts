import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessControlContract } from '../data-contracts/access-control-contract';
import { HasAccess } from '../decorators/has-access.decorator';
import { ListDto } from '../dtos/list.dto';
import { PostPowerSourceDto } from '../dtos/post-power-source.dto';
import { PowerSourceDto } from '../dtos/power-source.dto';
import { ResponseDto } from '../dtos/response-dto';
import { UpdatePowerSourceDto } from '../dtos/update-power-source.dto';
import { PermissionEnum } from '../enums/permission.enum';
import { PermissionService } from '../utils/permission.service';

@Injectable({
  providedIn: 'root'
})
export class PowerSourceService implements AccessControlContract {

  constructor(
    private httpClient: HttpClient,
    public permissionService: PermissionService
  ) { }

  getPowerSource(filter: any = { page: 1, size: environment.paginationLength }): Observable<ResponseDto<ListDto<PowerSourceDto>>> {
    const apiEndpoint = 'powerSources';
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    return this.httpClient.get<ResponseDto<ListDto<PowerSourceDto>>>(`${environment.apiUrl}/${apiEndpoint}`, { params });
  }

  // @HasAccess(PermissionEnum.Update, PowerSourceResources.UpdatePowerSource)
  enablePowerSource(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `powerSources/enable/${id}`
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }
  // @HasAccess(PermissionEnum.Update, PowerSourceResources.UpdatePowerSource)
  disablePowerSource(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `powerSources/disable/${id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }
  // @HasAccess(PermissionEnum.Create, PowerSourceResources.CreatePowerSource)
  postPowerSource(powerSource: PostPowerSourceDto): Observable<ResponseDto<PowerSourceDto>> {
    const apiEndpoint = 'powerSources';
    return this.httpClient.post<ResponseDto<PowerSourceDto>>(`${environment.apiUrl}/${apiEndpoint}`, powerSource);
  }

  // @HasAccess(PermissionEnum.Update, PowerSourceResources.UpdatePowerSource)
  updatePowerSource(powerSource: UpdatePowerSourceDto): Observable<ResponseDto<any>> {
    const apiEndpoint = `powerSources/${powerSource.id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, powerSource);
  }

  getPowerSourceGeneratingSet(id: any, filter: any = { page: 1, size: 5 }): Observable<ResponseDto<any>> {
    const apiEndpoint = `PowerSources/get-powersource-generating-set/${id}`;
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, { params });
  }
}
