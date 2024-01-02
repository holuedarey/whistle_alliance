import { Injectable } from '@angular/core';
import { NinDto } from '../dtos/nin.dto';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PersonalInfoDto } from '../dtos/personal-info.dto';
import { OtpDto } from '../dtos/otp.dto';
import { TokenExport } from '../utils/custom-token-storage/custom-token-storage.module';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { SecureLocalStorageService } from '../utils/secure-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor(private httpClient: HttpClient, private secureLs: SecureLocalStorageService) { }

  getAllProduct(): Observable<ResponseDto<any>> {
    const token = this.secureLs.get<TokenExport>(LocalStorageKey.JWT.toString());
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token.token);
    const apiEndpoint = 'product/loan';
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, {headers: headers});
  }

}
