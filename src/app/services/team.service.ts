import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService {


  //teams
  public getAllMemberships(): Observable<object> {

    return this.http.get(this.API_URL + `/users/userId/memberships`, this.getHttpOptions());
  }

  public createTeam(teamName: string): Observable<object> {

    return this.http.post(this.API_URL + `/users/userId/memberships`,
      {
        name: teamName,
        autoJoinDomain: true,
        forceTwoFactor: true
      }, this.getHttpOptions());
  }
  public getTeamDetails(teamId: number): Observable<object> {

    return this.http.get(this.API_URL + `/groups/${teamId}`, this.getHttpOptions());
  }

  public updateTeam(teamId: number, teamName: string): Observable<object> {

    return this.http.patch(this.API_URL + `/groups/${teamId}/`,
      { name: teamName }, this.getHttpOptions());
  }

  public deleteTeam(teamId: number): Observable<object> {

    return this.http.delete(this.API_URL + `/groups/${teamId}/`, this.getHttpOptions());
  }

  //members
  public addMember(teamId: number, email: string, name: string, role: string): Observable<object> {

    return this.http.post(this.API_URL + `/groups/${teamId}/memberships`,
      { email: email, name: name, role: role }, this.getHttpOptions());
  }

  public getAllMembers(teamId: number): Observable<object> {

    return this.http.get(this.API_URL + `/groups/${teamId}/memberships`, this.getHttpOptions());
  }

  public updateMember(teamId: number, memberId: number, role: string): Observable<object> {

    return this.http.patch(this.API_URL + `/groups/${teamId}/memberships/${memberId}`,
      { role: role }, this.getHttpOptions());
  }

  public deleteMember(memberId: number, teamId: number): Observable<object> {

    return this.http.delete(this.API_URL + `/groups/${teamId}/memberships/${memberId}`, this.getHttpOptions());
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
