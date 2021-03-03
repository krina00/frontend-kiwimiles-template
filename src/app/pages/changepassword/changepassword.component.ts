import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services';
import { AuthenticationService } from '../../services/authentication.service';

interface mfaMethodDTO {
  name: string,
  code: string
}

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  userId: number
  resetPasswordForm: FormGroup;
  submitted = false;
  setPassword = true;
  tokenRetrived: string;
  requireCurrentPassword: boolean = true;
  loggedInFlag: boolean = true;
  currentUserId: number = +localStorage.getItem('id');
  setting: boolean = false;
  mfaEnabled: 'enabled' | 'disabled';
  mfaMethods: mfaMethodDTO[] = [
    { name: 'Time Based OTP by QR scanner', code: 'TOTP' },
    { name: 'Text OTP', code: 'SMS' },
    { name: 'Email OTP', code: 'EMAIL' },
  ];
  twoFactorType: 'TOTP' | 'SMS' | 'EMAIL' = 'TOTP';
  errorMessage: string;
  error;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.tokenRetrived = params['token'] ?? null;
      if (this.tokenRetrived) {
        this.requireCurrentPassword = false;
        this.loggedInFlag = false;
      }
      else {
        this.tokenRetrived = localStorage.getItem('refreshToken');
      }
    });
    this.userService.getUserProfile(this.currentUserId).subscribe((data) => {
      if (data.twoFactorMethod == 'NONE') {
        this.mfaEnabled = 'disabled';
      }
      else {
        this.mfaEnabled = 'enabled';
      }
    });
  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('id'));
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required,],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.mustMatch('newPassword', 'confirmPassword')
    })

  }

  private enable2FA(): void {
    this.setting = true;
  }

  private enableCompletion(successFlag: boolean) {
    if (successFlag) {
      this.mfaEnabled = 'enabled';
    }
    else {
      this.mfaEnabled = 'disabled';
    }
    this.setting = false;
  }

  private disable2FA(): void {
    this.authenticationService.disable2FA(this.currentUserId).subscribe(() => {
      this.mfaEnabled = 'disabled';
    });
    this.setting = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      console.error('Invalid Data');
    }
    else {
      this.authenticationService.changePassword(
        this.userId,
        this.resetPasswordForm.value.currentPassword,
        this.resetPasswordForm.value.newPassword).subscribe(
        data => {
           this.setPassword = false;
           this.authenticationService.logout().subscribe(()=>{
            this.router.navigate(['/password-reset-window']);
           });
           
        },
        error => {
          this.error = error;
          console.error(error);
        }
      );
    }
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }

  }
}
