import { ServiceBandResources } from './../../pages/tariff-management/service-band/service-band-resources';
import { ServiceBandDto } from './../dtos/service-band.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessControlContract } from '../data-contracts/access-control-contract';
import { HasAccess } from '../decorators/has-access.decorator';
import { ListDto } from '../dtos/list.dto';
import { ResponseDto } from '../dtos/response-dto';
import { PermissionEnum } from '../enums/permission.enum';
import { PermissionService } from '../utils/permission.service';
import { PostServiceBandDto } from '../dtos/post-service-band.dto';
import { UpdateServiceBandDto } from '../dtos/update-service-band.dto';

@Injectable({
  providedIn: 'root'
})
export class ServiceBandService implements AccessControlContract {

  constructor(
    private httpClient: HttpClient,
    public permissionService: PermissionService
  ) { }

  getServiceBand(filter: any = { page: 1, size: environment.paginationLength }): Observable<ResponseDto<ListDto<ServiceBandDto>>> {
    const apiEndpoint = 'ServiceBands';
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    return this.httpClient.get<ResponseDto<ListDto<ServiceBandDto>>>(`${environment.apiUrl}/${apiEndpoint}`, { params });
  }

  @HasAccess(PermissionEnum.Create, ServiceBandResources.CreateServiceBand)
  postServiceBand(serviceBand: PostServiceBandDto): Observable<ResponseDto<ServiceBandDto>> {
    const apiEndpoint = 'ServiceBands';
    return this.httpClient.post<ResponseDto<ServiceBandDto>>(`${environment.apiUrl}/${apiEndpoint}`, serviceBand);
  }

  @HasAccess(PermissionEnum.Update, ServiceBandResources.UpdateServiceBand)
  updateServiceBand(serviceBand: UpdateServiceBandDto): Observable<ResponseDto<any>> {
    const apiEndpoint = `ServiceBands/${serviceBand.id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, serviceBand);
  }

  @HasAccess(PermissionEnum.Update, ServiceBandResources.UpdateServiceBand)
  enableServiceBand(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `ServiceBands/enable/${id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }

  @HasAccess(PermissionEnum.Update, ServiceBandResources.UpdateServiceBand)
  disableServiceBand(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `ServiceBands/disable/${id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }

}
