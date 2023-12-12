import { TariffResources } from './../../pages/tariff-management/tariff/tariff-resources';
import { PostTariffDto } from './../dtos/post-tariff.dto';
import { TariffDto } from './../dtos/tariff.dto';
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
import { UpdateTariffDto } from '../dtos/update-tariff.dto';
import { RateClassDto } from '../dtos/rateClass.dto';

@Injectable({
  providedIn: 'root'
})
export class TariffService implements AccessControlContract {

  constructor(
    private httpClient: HttpClient,
    public permissionService: PermissionService
  ) { }

  getTariff(filter: any = { page: 1, size: environment.paginationLength }): Observable<ResponseDto<ListDto<TariffDto>>> {
    const apiEndpoint = 'Tariffs';
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    return this.httpClient.get<ResponseDto<ListDto<TariffDto>>>(`${environment.apiUrl}/${apiEndpoint}`, { params });
  }
  getRateClass(): Observable<ResponseDto<RateClassDto>> {
    const apiEndpoint = 'Tariffs/get-rateClass';
    return this.httpClient.get<ResponseDto<RateClassDto>>(`${environment.apiUrl}/${apiEndpoint}`);
  }

  @HasAccess(PermissionEnum.Create, TariffResources.CreateTariff)
  postTariff(tariff: PostTariffDto): Observable<ResponseDto<TariffDto>> {
    const apiEndpoint = 'Tariffs';
    return this.httpClient.post<ResponseDto<TariffDto>>(`${environment.apiUrl}/${apiEndpoint}`, tariff);
  }

  @HasAccess(PermissionEnum.Update, TariffResources.UpdateTariff)
  updateTariff(tariff: UpdateTariffDto): Observable<ResponseDto<any>> {
    const apiEndpoint = `Tariffs/${tariff.id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, tariff);
  }

  @HasAccess(PermissionEnum.Update, TariffResources.UpdateTariff)
  enableTariff(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `Tariffs/enable/${id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }

  @HasAccess(PermissionEnum.Update, TariffResources.UpdateTariff)
  disableTariff(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `Tariffs/disable/${id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }

}
