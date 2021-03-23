import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    var httpOptions;
    if(!token){
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    }
    else{
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          .set('authorization', 'Bearer ' + token)
      };
    }
    return httpOptions;
  }

  loginWithGoogle() {
    return this.http.get(this.API_URL + '/auth/google');
  }

  loginWithFacebook() {
    return this.http.get(this.API_URL + '/auth/facebook');
  }

  login(user: User): Observable<any> {
    return this.http.post(this.API_URL + '/auth/login', user, this.getHttpOptions())
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (!res.multiFactorRequired) {
            localStorage.setItem('token', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.removeItem('totpToken');
            return { accessToken: res.accessToken };
          }
          else if (res.multiFactorRequired) {
            localStorage.setItem('totpToken', res.totpToken);
            var type: string = res.type ?? null;
            if (type) {
              return {
                method: type,
                multiFactorRequired: true
              }
            }
            else {
              return throwError(`INVALID MFA type - ${res.type} received`);
            }
          }
          else {
            return throwError("Unsuccessful login");
          }
        }),
      );
  }

  loginWithEmailToken(emailMFAToken: string): Observable<any> {
    return this.http.post(this.API_URL + '/auth/login/token', { token: emailMFAToken }, this.getHttpOptions())
      .pipe(
        map((res: any) => {
          if (res.accessToken) {
            localStorage.setItem('token', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.removeItem('totpToken');
            return { accessToken: res.accessToken };
          }
          else {
            return throwError("Unsuccessful login");
          }
        }),
      );
  }

  logout(): Observable<any> {
    const token: string = localStorage.getItem('refreshToken');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('id');
    sessionStorage.clear();
    return this.http.post(this.API_URL + '/auth/logout', { token: token }, this.getHttpOptions());
  }

  refreshAccessToken() {
    const refreshToken: string = localStorage.getItem('refreshToken');
    return this.http.post(this.API_URL + '/auth/refresh', { token: refreshToken }, this.getHttpOptions())
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res) {
            localStorage.setItem('token', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            return { accessToken: res.accessToken };
          }
          else {
            return throwError("Unsuccessful refresh");
          }
        }),
      );
  }

  register(user: User): Observable<any> {
    console.log(user);
    return this.http.post(this.API_URL + '/auth/register', user, this.getHttpOptions());
  }

  passwordSet(user: User): Observable<any> {
    return this.http.post(this.API_URL + '/api/user/password', user, this.getHttpOptions());
  }

  checkToken(token: string): Observable<any>{
    return this.http.post(this.API_URL + '/api/user/checktoken', { token: token }, this.getHttpOptions());
  }

  forgotpassword(email: string): Observable<any> {
    return this.http.post(this.API_URL + '/auth/forgot-password', { email: email }, this.getHttpOptions())
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.patch(this.API_URL + `/users/userId`, { currentPassword: currentPassword, newPassword: newPassword }, this.getHttpOptions())
  }

  resetPassword(password: string, token: string):  Observable<any> {
    return this.http.post(this.API_URL + '/auth/reset-password', { password: password, token: token }, this.getHttpOptions())
  }

  enableTotp2FA(): Observable<any> {
    return this.http.post(this.API_URL + `/users/userId/multi-factor-authentication/totp`, {}, this.getHttpOptions())
  }

  enableSms2FA(phoneNumber: string): Observable<any> {
    return this.http.post(this.API_URL + `/users/userId/multi-factor-authentication/sms`, { phone: phoneNumber }, this.getHttpOptions())
  }

  enableEmail2FA(): Observable<any> {
    return this.http.post(this.API_URL + `/users/userId/multi-factor-authentication/email`, {}, this.getHttpOptions())
  }

  sendTotp(TotpCode: number): Observable<any> {
    return this.http.post(this.API_URL + `/users/userId/multi-factor-authentication/totp`, { token: TotpCode }, this.getHttpOptions())
  }

  sendSmsOtp(smsOtpCode: number): Observable<any> {
    return this.http.post(this.API_URL + `/users/userId/multi-factor-authentication/sms`, { token: smsOtpCode }, this.getHttpOptions())
  }

  sendEmailOtp(emailOtpCode: number): Observable<any> {
    return this.http.post(this.API_URL + `/users/userId/multi-factor-authentication/email`, { token: emailOtpCode }, this.getHttpOptions())
  }

  disable2FA(): Observable<any> {
    return this.http.delete(this.API_URL + `/users/userId/multi-factor-authentication`, this.getHttpOptions())
  }


}
