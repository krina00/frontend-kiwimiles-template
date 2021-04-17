import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../dto/user.dto';
import { BaseService } from './base.service';
import { PermissionService } from './permission.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
   
  // constructor(
  //   public http: HttpClient,
  //   private jwtHelper: JwtHelperService) {
  //   super(http);
  // }
  public getUserProfile(): Observable<any> {
    
    return this.http.get(this.API_URL + "/users/userId", this.getHttpOptions());
  }

  public getUserPrivilege(): Observable<any> {
  
    return this.http.get(this.API_URL + "/users/userId/privileges", this.getHttpOptions());
  }

  public getuserEmailId(): Observable<any> {

    return this.http.get(this.API_URL + "/users/userId/emails", this.getHttpOptions());
  }

  public updateUserProfile(user: UserDTO): Observable<any> {

    const updateUser = {
      checkLocationOnLogin: user.isDetectLocationOnLogin,
      countryCode: user.country,
      gender: user.gender,
      name: user.name
    }
    
    return this.http.patch(this.API_URL + "/users/userId", updateUser, this.getHttpOptions());
  }

  private getHttpOptions(): { headers: HttpHeaders } {

    const token: string = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        .set('authorization', 'Bearer ' + token)
    };
    return httpOptions;
  }
}
