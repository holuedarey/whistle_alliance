import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response-dto';
import { HttpClient, HttpHeaders, HttpParams,  } from '@angular/common/http';
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

  getAllLoan(userId?:any, filter: any = { pageNumber: 1, pageSize: environment.paginationLength }): Observable<ResponseDto<any>> {
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    
    if(userId){
      params = params.set('userId', userId);
    }
    const apiEndpoint = 'loan';
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, {params});
  }

  getSingleLoan(loanId:Number): Observable<ResponseDto<any>> {
    const apiEndpoint = `loan/repayment/${loanId}`;
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`);
  }

  getSingleLoanById(loanId:Number): Observable<ResponseDto<any>> {
    const apiEndpoint = `loan/${loanId}`;
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`);
  }

  getSingleLoanFile(fileId:Number): Observable<ResponseDto<any>> {
    const apiEndpoint = `loans/file/download/${fileId}`;
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`);
  }

  approveRejectLoanFile(fileId:Number, payload:any): Observable<ResponseDto<any>> {
    const apiEndpoint = `loans/file/update/${fileId}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, payload);
  }
  approveRejectLoan(payload:any): Observable<ResponseDto<any>> {
    const apiEndpoint = `loan/status`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, payload);
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
 

  createLoan(loan:any): Observable<ResponseDto<any>> {
    let headers = new HttpHeaders();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json')
    
    const apiEndpoint = 'loan/apply';
    return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, loan, {headers:headers});
  }

  getLoanSummary(filter: any = { pageNumber: 1, pageSize: environment.paginationLength }): Observable<ResponseDto<any>> {
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    const apiEndpoint = 'loan/summary';
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, {params});
  }
  createLoanProduct(loanProduct:LoanProductRequestDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'product/loan/create';
    return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, loanProduct);
  }
}
