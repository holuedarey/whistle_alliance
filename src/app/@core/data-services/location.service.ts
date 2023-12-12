import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocationDto } from '../dtos/location.dto';
import { ResponseDto } from '../dtos/response-dto';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCountries(): Observable<ResponseDto<LocationDto[]>> {
    const apiEndpoint = 'locations/countries';
    return this.httpClient.get<ResponseDto<LocationDto[]>>(`${environment.apiUrl}/${apiEndpoint}`);
  }

  getStates(country: any): Observable<ResponseDto<LocationDto[]>> {
    const apiEndpoint = 'locations/states';
    let params = new HttpParams();
    for (const key in country) {
      params = params.set(key, country[key]);
    }
    return this.httpClient.get<ResponseDto<LocationDto[]>>(`${environment.apiUrl}/${apiEndpoint}`, { params });
  }

  getAreas(state: any): Observable<ResponseDto<LocationDto[]>> {
    const apiEndpoint = 'locations/area';
    let params = new HttpParams();
    for (const key in state) {
      params = params.set(key, state[key]);
    }
    return this.httpClient.get<ResponseDto<LocationDto[]>>(`${environment.apiUrl}/${apiEndpoint}`, { params });
  }

}
