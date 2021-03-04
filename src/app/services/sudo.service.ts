import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserDTO, UserDTO } from '../dto/user.dto';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class SudoService extends BaseService {

    // users
    public getUsers(): Observable<any> {

        return this.http.get(this.API_URL + `/users/`, this.getHttpOptions());
    }

    public updateUser(userId: number, updateUserObject: UpdateUserDTO): Observable<any> {

        return this.http.patch(this.API_URL + `/users/${userId}`, updateUserObject, this.getHttpOptions());
    }

    public deleteUser(userId: number): Observable<any> {

        return this.http.delete(this.API_URL + `/users/${userId}`, this.getHttpOptions());
    }

    public getUserProfile(userId: number): Observable<any> {

        return this.http.get(this.API_URL + `/users/${userId}`, this.getHttpOptions());
    }

    public getuserEmailId(userId: number): Observable<any> {

        return this.http.get(this.API_URL + `/users/${userId}/emails`, this.getHttpOptions());
    }

    //teams

    public getAllAvailableTeams(): Observable<object> {

        return this.http.get(this.API_URL + `/groups`, this.getHttpOptions());
    }

    private getHttpOptions(): { headers: HttpHeaders } {
        
        const token: string = localStorage.getItem('token');
        if (!token) {
            history.go(0);
        }
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                .set('authorization', 'Bearer ' + token)
        };
        return httpOptions;
    }

}