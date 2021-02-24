import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AuthenticationService } from './services/authentication.service';

const API_URL = environment.API_URL;

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor( 
    private authenticationService: AuthenticationService,
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (request.body !== null) {
      if (request.body.flag !== undefined && request.body.flag === 'refresh') {
        const token = localStorage.getItem("refreshToken");
        request = request.clone({
          setHeaders: {
            roll: CryptoJS.AES.decrypt(localStorage.getItem('roll'), environment.JWT_SECRET).toString(CryptoJS.enc.Utf8),
            id: localStorage.getItem('id'),
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(request).pipe(
          catchError((error) => {
            this.authenticationService.logout().subscribe();
            this.router.navigate(['login']);
            throw 'session timed out!';
          })
        );
      }
    }
    if (request.headers.get('content-type') !== null) {
      const token = localStorage.getItem("token");
      if (token/* && !this.jwtHelper.isTokenExpired(localStorage.getItem('token'))*/) {
        request = request.clone({
          setHeaders: {
            roll: CryptoJS.AES.decrypt(localStorage.getItem('roll'), environment.JWT_SECRET).toString(CryptoJS.enc.Utf8),
            id: localStorage.getItem('id'),
            Authorization: `Bearer ${token}`,
          },
        });
      }
      else {
        this.authenticationService.logout().subscribe();
      }

      return next.handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {

            this.http.post(API_URL + '/api/auth/refresh', { flag: 'refresh' }).subscribe((data: any) => {
              localStorage.setItem('token', data.access_token)
              const token = localStorage.getItem("token");
              request = request.clone({
                setHeaders: {
                  roll: CryptoJS.AES.decrypt(localStorage.getItem('roll'), environment.JWT_SECRET).toString(CryptoJS.enc.Utf8),
                  id: localStorage.getItem('id'),
                  Authorization: `Bearer ${token}`,
                },
              });
              return next.handle(request);
            });
            return throwError(error);
          })
        );
    }
    else {
      const token = localStorage.getItem("token");
      request = request.clone({
        setHeaders: {
          roll: CryptoJS.AES.decrypt(localStorage.getItem('roll'), environment.JWT_SECRET).toString(CryptoJS.enc.Utf8),
          id: localStorage.getItem('id'),
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(request);
    }
  }
}
