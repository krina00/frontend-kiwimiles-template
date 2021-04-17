import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected API_URL = environment.API_URL;

  constructor(protected http: HttpClient) {
  }
  
}
