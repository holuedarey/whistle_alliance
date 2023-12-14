import { Injectable, Injector } from "@angular/core";
import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
  HttpEvent
} from "@angular/common/http";
import { Observable, throwError, from } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { NbAuthService } from "@nebular/auth";
import { SecureLocalStorageService } from "../utils/secure-local-storage.service";
import { LocalStorageKey } from "../enums/local-storage-key.enum";
import { TokenExport } from "../utils/custom-token-storage/custom-token-storage.module";


@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  constructor(public auth: NbAuthService, public router: Router,
    private secureLs: SecureLocalStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = this.secureLs.get<TokenExport>(LocalStorageKey.JWT.toString());
    let state = this.auth.isAuthenticated();
    if (!state) {
      this.router.navigate(['/login']);
    }
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.token) });
    }
    
    if (request.headers.get('Content-Type') == 'multipart/form-data') {
      request = request.clone({ headers: request.headers.set('Content-Type', 'multipart/form-data') });
    }else{
      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    

    //start loading page with preloader
    // this.showLoader();
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
        let data = {};
        data = {
          reason: error && error.error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        return throwError(error);
      }));
  }
}