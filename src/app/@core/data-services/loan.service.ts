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
export class LoanService {

  constructor(private httpClient: HttpClient, private secureLs: SecureLocalStorageService) { }

  getAllLoan(filter: any = { pageNumber: 1, pageSize: environment.paginationLength }): Observable<ResponseDto<any>> {
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    const apiEndpoint = 'loan';
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, {params});
  }

  getSingleLoan(loanId:Number): Observable<ResponseDto<any>> {
    const apiEndpoint = `loan/repayment/${loanId}`;
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`);
  }

  getUserLoan(userID:number, limit:number, filter: any = {pageNumber: 1}): Observable<ResponseDto<any>> {
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    params = params.set("pageSize", limit || 5)
    const apiEndpoint = 'loan';
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, {params});
  }
  updateLoan(loan:LoanDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'loan/status';
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, loan);
  }

  createLoan(loan:any): Observable<ResponseDto<any>> {
    const apiEndpoint = 'loan/apply';
    return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, loan);
  }


  createLoanProduct(loanProduct:LoanProductRequestDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'product/loan/create';
    return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, loanProduct);
  }
}
