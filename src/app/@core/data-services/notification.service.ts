import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response-dto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoanDto } from '../dtos/loan.dto';
import { SecureLocalStorageService } from '../utils/secure-local-storage.service';
import { TokenExport } from '../utils/custom-token-storage/custom-token-storage.module';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { LoanProductRequestDto } from '../dtos/loan-product-request.dto';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient, private secureLs: SecureLocalStorageService) { }

  getAllNotification(userId?:any, filter: any = { pageNumber: 1, pageSize: environment.paginationLength }): Observable<ResponseDto<any>> {
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    
    if(userId){
      params = params.set('userId', userId);
    }
    const apiEndpoint = 'notification';
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, {params});
  }

  getSingleNotificationById(notificationId:Number): Observable<ResponseDto<any>> {
    const apiEndpoint = `notification/${notificationId}`;
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`);
  }

  getUserNotification(userID:number, limit:number, filter: any = {pageNumber: 1}): Observable<ResponseDto<any>> {
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    params = params.set("pageSize", limit || 5)
    const apiEndpoint = 'notification';
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, {params});
  }
  updateNotification(notificationId:LoanDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'notification/update/'+notificationId;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, {});
  }

}
