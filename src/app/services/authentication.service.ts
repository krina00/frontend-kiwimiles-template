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
    const token: string = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        .set('authorization', 'Bearer ' + token)
    };
    return httpOptions;
  }

  login(user: User): Observable<any> {
    return this.http.post(this.API_URL + '/auth/login', user, this.httpOptions)
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res && res.token) {
            localStorage.setItem('id', (res.user?.id ?? null));
            localStorage.setItem('token', res.token.accessToken);
            localStorage.setItem('refreshToken', res.token.refreshToken);
            localStorage.removeItem('totpToken');
            return { accessToken: res.token.accessToken };
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
    return this.http.post(this.API_URL + '/auth/login/token', { token: emailMFAToken }, this.httpOptions)
      .pipe(
        map((res: any) => {
          if (res && res.token) {
            localStorage.setItem('id', (res.user?.id ?? null));
            localStorage.setItem('token', res.token.accessToken);
            localStorage.setItem('refreshToken', res.token.refreshToken);
            localStorage.removeItem('totpToken');
            return { accessToken: res.token.accessToken };
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
    return this.http.post(this.API_URL + '/auth/logout', { token: token }, this.httpOptions);
  }

  refreshAccessToken() {
    const refreshToken: string = localStorage.getItem('refreshToken');
    return this.http.post(this.API_URL + '/auth/refresh', { token: refreshToken }, this.httpOptions)
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
    return this.http.post(this.API_URL + '/auth/register', user, this.httpOptions);
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

  changePassword(userId: number, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.patch(this.API_URL + `/users/${userId}`, { currentPassword: currentPassword, newPassword: newPassword }, this.getHttpOptions())
  }

  resetPassword(password: string, token: string):  Observable<any> {
    return this.http.post(this.API_URL + '/auth/reset-password', { password: password, token: token }, this.getHttpOptions())
  }

  enableTotp2FA(userId: number): Observable<any> {
    return this.http.post(this.API_URL + `/users/${userId}/multi-factor-authentication/totp`, {}, this.getHttpOptions())
  }

  enableSms2FA(userId: number, phoneNumber: string): Observable<any> {
    return this.http.post(this.API_URL + `/users/${userId}/multi-factor-authentication/sms`, { phone: phoneNumber }, this.getHttpOptions())
  }

  enableEmail2FA(userId: number): Observable<any> {
    return this.http.post(this.API_URL + `/users/${userId}/multi-factor-authentication/email`, {}, this.getHttpOptions())
  }

  sendTotp(userId: number, TotpCode: number): Observable<any> {
    return this.http.post(this.API_URL + `/users/${userId}/multi-factor-authentication/totp`, { token: TotpCode }, this.getHttpOptions())
  }

  sendSmsOtp(userId: number, smsOtpCode: number): Observable<any> {
    return this.http.post(this.API_URL + `/users/${userId}/multi-factor-authentication/sms`, { token: smsOtpCode }, this.getHttpOptions())
  }

  sendEmailOtp(userId: number, emailOtpCode: number): Observable<any> {
    return this.http.post(this.API_URL + `/users/${userId}/multi-factor-authentication/email`, { token: emailOtpCode }, this.getHttpOptions())
  }

  disable2FA(userId: number): Observable<any> {
    return this.http.delete(this.API_URL + `/users/${userId}/multi-factor-authentication`, this.getHttpOptions())
  }


}
