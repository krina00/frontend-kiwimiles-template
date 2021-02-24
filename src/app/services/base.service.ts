import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected API_URL = environment.API_URL;
  token: string = localStorage.getItem('token');
  httpOptions;
  header;

  constructor(protected http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        .set('authorization', 'Bearer ' + this.token)
    };
    this.header = {
      headers: new HttpHeaders()
        .set('authorization', 'Bearer ' + this.token)
    }
  }
  
}
