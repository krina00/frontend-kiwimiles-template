import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService{

  private subject = new Subject<string>();

  setAccessToken(token: string) {
    this.subject.next(token);
  }

  getAccessToken(): Observable<string> {
    return this.subject.asObservable();
  }
}
