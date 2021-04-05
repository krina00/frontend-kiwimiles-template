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
    public getUsers(skip?: number, take?: number): Observable<any> {
        if(isNaN(skip) || isNaN(take)){
            return this.http.get(this.API_URL + `/users/`, this.getHttpOptions());
        }
        return this.http.get(this.API_URL + `/users?skip=${skip}&take=${take}`, this.getHttpOptions());
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

    public getAllAvailableTeams(skip: number, take: number): Observable<object> {
        if(isNaN(skip) || isNaN(take)) {
            return this.http.get(this.API_URL + `/groups/`, this.getHttpOptions());
        }
        return this.http.get(this.API_URL + `/groups?skip=${skip}&take=${take}`, this.getHttpOptions());
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
