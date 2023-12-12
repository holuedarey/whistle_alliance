import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PersonalInfoDto } from '../dtos/personal-info.dto';
import { OtpDto } from '../dtos/otp.dto';
import { LoanDto } from '../dtos/loan.dto';
import { ListDto } from '../dtos/list.dto';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private httpClient: HttpClient) { }

  getAllLoan(filter: any = { pageNumber: 1, pageSize: environment.paginationLength }): Observable<ResponseDto<any>> {
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    const apiEndpoint = 'loan';
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, {params});
  }

  getSingleLoan(filter: any = { pageNumber: 1, pageSize: environment.paginationLength }): Observable<ResponseDto<any>> {
    const apiEndpoint = 'product/loan';
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`);
  }

  getUserLoan(userID:number, filter: any = {userId: userID,  pageNumber: 1, pageSize: environment.recentLength }): Observable<ResponseDto<any>> {
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    const apiEndpoint = 'loan';
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, {params});
  }
  updateLoan(loan:LoanDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'loan/status';
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, loan);
  }

  createLoan(loan:LoanDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'loan/apply';
    return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, loan);
  }
}
