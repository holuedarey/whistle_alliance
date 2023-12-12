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
export class OnboardingService {

  constructor(private httpClient: HttpClient) { }

  getNin(ninDto: NinDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'user/verify';
    return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, ninDto);
  }

  processInfo(personalInfoDto: PersonalInfoDto, id:Number): Observable<ResponseDto<any>> {
    const apiEndpoint = `user/update/${id}`;
    console.log("apiEndpoint", apiEndpoint);
    
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, personalInfoDto);
  }

  processOtp(otpDto: OtpDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'otp/validate';
    return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, otpDto);
  }

  resendOtp(otpDto: OtpDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'otp/generate';
    return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, otpDto);
  }
}
