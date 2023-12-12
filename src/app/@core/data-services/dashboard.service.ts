import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoanCalculateDto } from '../dtos/loan-calculate.dto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  claculateLoan(calculateLoan:LoanCalculateDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'loan/calculate';
    return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, calculateLoan);
  }

}
