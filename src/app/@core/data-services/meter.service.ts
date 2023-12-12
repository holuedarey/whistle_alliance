import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MeterResources } from 'src/app/pages/assets/meters/meter-resources';
import { environment } from 'src/environments/environment';
import { AccessControlContract } from '../data-contracts/access-control-contract';
import { HasAccess } from '../decorators/has-access.decorator';
import { ListDto } from '../dtos/list.dto';
import { MeterManufaturerDto } from '../dtos/meter-manufacturer.dto';
import { MeterDto } from '../dtos/meter.dto';
import { PostMeterDto } from '../dtos/post-meter.dto';
import { ResponseDto } from '../dtos/response-dto';
import { UpdateMeterDto } from '../dtos/update-meter.dto';
import { PermissionEnum } from '../enums/permission.enum';
import { PermissionService } from '../utils/permission.service';

@Injectable({
  providedIn: 'root'
})
export class MeterService implements AccessControlContract {

  constructor(
    private httpClient: HttpClient,
    public permissionService: PermissionService
  ) { }

  getMeters(filter: any = { page: 1, size: environment.paginationLength }): Observable<ResponseDto<ListDto<MeterDto>>> {
    const apiEndpoint = 'meters';
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    return this.httpClient.get<ResponseDto<ListDto<MeterDto>>>(`${environment.apiUrl}/${apiEndpoint}`, { params });
  }

  getUnassignedMeter(meterNumber: string): Observable<ResponseDto<MeterDto>> {
    const apiEndpoint = 'meters/unassigned';
    return this.httpClient.get<ResponseDto<MeterDto>>(`${environment.apiUrl}/${apiEndpoint}/${meterNumber}`);
  }

  @HasAccess(PermissionEnum.Create, MeterResources.CreateMeter)
  postMeter(meter: PostMeterDto): Observable<ResponseDto<MeterDto>> {
    const apiEndpoint = 'meters';
    return this.httpClient.post<ResponseDto<MeterDto>>(`${environment.apiUrl}/${apiEndpoint}`, meter);
  }

  @HasAccess(PermissionEnum.Update, MeterResources.UpdateMeter)
  updateMeter(meter: UpdateMeterDto): Observable<ResponseDto<any>> {
    const apiEndpoint = `meters/${meter.id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, meter);
  }

  @HasAccess(PermissionEnum.Update, MeterResources.UpdateMeter)
  enableMeter(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `meters/enable/${id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }

  @HasAccess(PermissionEnum.Update, MeterResources.UpdateMeter)
  disableMeter(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `meters/disable/${id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }

  getMeterManufacturer(): Observable<ResponseDto<MeterManufaturerDto[]>> {
    const apiEndpoint = 'meters/get-meterManufacturers';
    return this.httpClient.get<ResponseDto<MeterManufaturerDto[]>>(`${environment.apiUrl}/${apiEndpoint}`);
  }
}
