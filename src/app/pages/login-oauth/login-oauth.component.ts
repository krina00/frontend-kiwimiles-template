import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login-oauth',
})
export class LoginOAuthComponent implements OnInit {

  email: string;
  password: string;
  error: string;
  passwordless: boolean = false;
  accessToken: string;
  refreshToken: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.accessToken = params['accessToken'] ?? null;
        this.refreshToken = params['refreshToken'] ?? null;
    });
  }

  ngOnInit() {
    if(!this.accessToken || !this.refreshToken){
      throwError("couldn't retrieve tokens from backend")
    }
    localStorage.setItem('token', this.accessToken);
    localStorage.setItem('refreshToken', this.refreshToken);
    this.router.navigate(['auth/link/login']);
  }
  
}
