import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../user';
import { ERR_UNAUTHORIZED, ERR_BAD_REQUEST } from '../../errors/error.constants'

@Component({
  selector: 'app-mfa-login',
  templateUrl: './mfa-login.component.html',
})
export class MultiFactorLoginComponent implements OnInit, OnDestroy {

  private email: string;
  private password: string;
  private otpCode: number;
  public error: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    const credentials = history.state.data;
    if (credentials) {
      this.email = credentials.email;
      this.password = credentials.password;
    }
    else {
      console.error("credentials not retrieved");
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  private otpValidation(otpCode: number): boolean {
    if (!otpCode) {
      this.error = 'OTP is Required';
      return false;
    }
    if (otpCode.toString().length < 6) {
      this.error = 'Minimum 6 digits are required';
      return false;
    }
    this.error = '';
    return true;
  }

  login(): void {
    this.email = this.email.trim();
    if (this.otpValidation(this.otpCode)) {
      this.authenticationService.login({ email: this.email, password: this.password, code: this.otpCode } as User)
        .subscribe(
          data => {
            console.log(data);
            if (data.accessToken) {
              this.error = '';
              this.router.navigate(['admin/dashboard']);
            }
          },
          error => {
            if (error.status == 401) {
              this.error = ERR_UNAUTHORIZED;
            }
            else if (error.status = 400) {
              this.error = ERR_BAD_REQUEST;
            }
            else {
              this.error = "Login Error";
            }
          }
        );
    }
  }
}
