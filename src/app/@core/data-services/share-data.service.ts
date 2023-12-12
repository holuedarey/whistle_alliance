import { Injectable } from '@angular/core';
import { NinDto } from '../dtos/nin.dto';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PersonalInfoDto } from '../dtos/personal-info.dto';
import { OtpDto } from '../dtos/otp.dto';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor(private httpClient: HttpClient) { }

  getAllProduct(): Observable<ResponseDto<any>> {
    const apiEndpoint = 'product/loan';
    return this.httpClient.get<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`);
  }

}
