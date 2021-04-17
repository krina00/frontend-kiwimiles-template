import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError} from 'rxjs';
import { environment } from '../environment/environment';
import { AuthenticationService } from '../../src/app/services/authentication.service'
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const API_URL = environment.API_URL;
@Injectable()
export class myJwtInterceptor implements HttpInterceptor {
  constructor( 
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = request.headers.get('Authorization');
    if(!token) return next.handle(request);
    var retrievedToken: string;  
    if(token.indexOf('Bearer') > -1) {
      retrievedToken = token.replace('Bearer ', '');
    }
    else {
      retrievedToken = token;
    }
    if((retrievedToken == 'null') || (token && this.jwtHelper.isTokenExpired(retrievedToken))){
      const refreshToken: string = localStorage.getItem("refreshToken");
      this.http.post(API_URL + '/auth/refresh', { 'token': refreshToken })
        .subscribe((data: any) => {
        const accessToken = data?.accessToken;
        const refreshToken = data?.refreshToken;
        if(!accessToken) this.authenticationService.logout().subscribe();
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem('refreshTrial', '1');
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return next.handle(request);
      },
      error => {
        this.authenticationService.logout().subscribe();
      });
    }
    else return next.handle(request);
    return next.handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if(error.status == 401){
              var trial: number = +localStorage.getItem('refreshTrial');
              if(trial > 0){
                trial = trial-1;
                localStorage.setItem('refreshTrial', trial.toString())
                history.go(0);
              }
              else {
                this.router.navigate(['/session-timeout']);
                return throwError(error);
              }
            }
          })
        );
  }
}
