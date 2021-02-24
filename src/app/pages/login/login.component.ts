import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../user';
import { ERR_UNAUTHORIZED, ERR_BAD_REQUEST } from '../../errors/error.constants'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string;
  password: string;
  error: string;
  passwordless: boolean = false;
  tokenParameter: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.tokenParameter = params['2Ftoken'] ?? null;
    });
  }



  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['admin/dashboard']);
    }
    if (this.tokenParameter) {
      this.authenticationService.loginWithEmailToken(this.tokenParameter).subscribe(
        data => {
          if (data.accessToken) {
            this.router.navigate(['admin/dashboard']);
          }
        },
        error => {
          if (error.status == 401) {
            this.error = ERR_UNAUTHORIZED;
          }
          else if (error.status == 400) {
            this.error = ERR_BAD_REQUEST;
          }
          else {
            this.error = "Login Error";
          }
        },
      );
    }
  }
  ngOnDestroy() {
  }

  login(): void {
    if (this.passwordless) {
      this.passwordLessLogin();
    }
    else {
      this.loginWithCrendetials();
    }
  }

  passwordLessLogin(): void {
    if (!this.email) {
      this.error = "Email field is required"
      return;
    }

    this.authenticationService.login({ email: this.email } as User)
      .subscribe(
        data => {
          this.router.navigate(['/email-notification']);
        },
        error => {
          if (error.status == 401) {
            this.error = ERR_UNAUTHORIZED;
          }
          else if (error.status == 400) {
            this.error = ERR_BAD_REQUEST;
          }
          else {
            this.error = "Login Error";
          }
        },
      );
  }

  loginWithCrendetials(): void {
    this.email = this.email.trim();
    if (!this.email) {
      this.error = "Email field is required"
      return;
    }
    if (!this.password) {
      this.error = "Password field is required"
      return;
    }
    this.authenticationService.login({ email: this.email, password: this.password } as User)
      .subscribe(
        data => {
          if (data.accessToken) {
            this.router.navigate(['admin/dashboard']);
          }
          else if (data.multiFactorRequired) {
            if (data.method == 'TOTP' || data.method == 'SMS') {
              this.router.navigate(['/otp'], { state: { data: { email: this.email, password: this.password } } });
            }
            else if (data.method == 'EMAIL') {
              this.router.navigate(['/email-notification']);
            }
            else {
              console.error(`Invalid method - ${data.method} received!`);
            }
          }
        },
        error => {
          if (error.status == 401) {
            this.error = ERR_UNAUTHORIZED;
          }
          else if (error.status == 400) {
            this.error = ERR_BAD_REQUEST;
          }
          else {
            this.error = "Login Error";
          }
        },
      );
  }
}
