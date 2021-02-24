import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UpdateUserDTO, UserDTO } from '../dto/user.dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  getUsers(): Observable<any> {
    const token: string = localStorage.getItem('token');
    if (!token) {
      history.go(0);
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        .set('authorization', 'Bearer ' + token)
    };
    return this.http.get(this.API_URL + `/users/`, httpOptions);
  }

  updateUser(userId: number, updateUserObject: UpdateUserDTO): Observable<any> {
    const token: string = localStorage.getItem('token');
    if (!token) {
      history.go(0);
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        .set('authorization', 'Bearer ' + token)
    };
    return this.http.patch(this.API_URL + `/users/${userId}`, updateUserObject, httpOptions);
  }

  deleteUser(userId: number): Observable<any> {
    const token: string = localStorage.getItem('token');
    if (!token) {
      history.go(0);
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        .set('authorization', 'Bearer ' + token)
    };
    return this.http.delete(this.API_URL + `/users/${userId}`, httpOptions);
  }

  getUserProfile(userId: number): Observable<any> {
    const token: string = localStorage.getItem('token');
    if (!token) {
      history.go(0);
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        .set('authorization', 'Bearer ' + token)
    };
    return this.http.get(this.API_URL + `/users/${userId}`, httpOptions);
  }

  getuserEmailId(userId: number): Observable<any> {
    const token: string = localStorage.getItem('token');
    if (!token) {
      history.go(0);
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        .set('authorization', 'Bearer ' + token)
    };
    return this.http.get(this.API_URL + `/users/${userId}/emails`, httpOptions);
  }

  updateUserProfile(user: UserDTO): Observable<any> {
    const userId: number = +localStorage.getItem('id');
    if (userId) {
      const updateUser = {
        checkLocationOnLogin: user.isDetectLocationOnLogin,
        countryCode: user.country,
        gender: user.gender,
        name: user.name
      }
      const token: string = localStorage.getItem('token');
      if (!token) {
        history.go(0);
      }
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          .set('authorization', 'Bearer ' + this.token)
      };
      return this.http.patch(this.API_URL + `/users/${userId}`, updateUser, httpOptions);
    }
    else {
      throwError('user id not found');
    }
  }

}
