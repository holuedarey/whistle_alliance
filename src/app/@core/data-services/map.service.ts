import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  isApiLoaded!: boolean;

  constructor(
    private httpClient: HttpClient,
  ) { }

  loadMapApi(): Observable<boolean> {
    if (!this.isApiLoaded) {
      return this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleMapKey}&sensor=true`, 'callback')
        .pipe(
          map(() => {
            this.isApiLoaded = true;
            return true;
          }),
          catchError(() => of(false)),
        );
    } else {
      return of(true);
    }
  }
}
