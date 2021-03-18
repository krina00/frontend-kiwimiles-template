import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import { UserService } from '../../services';
import { AuthenticationService } from '../../services/authentication.service';

interface mfaMethodDTO {
  name: string,
  code: 'TOTP' | 'SMS' | 'EMAIL'
}

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  
  resetPasswordForm: FormGroup;
  submitted = false;
  setPassword = true;
  tokenRetrived: string;
  requireCurrentPassword: boolean = true;
  loggedInFlag: boolean = true;
  setting: boolean = false;
  mfaEnabled: 'enabled' | 'disabled';
  mfaMethods: mfaMethodDTO[];
  twoFactorType: 'TOTP' | 'SMS' | 'EMAIL';
  errorMessage: string;
  hasViewProfilePermission: boolean = false;
  hasEnableMFA_permission: boolean = false;
  hasDisableMFA_permission: boolean = false;
  hasTOTP_permission: boolean = false;
  hasSMS_permission: boolean = false;
  hasEMAIL_permission: boolean = false;
  error

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private permissionService: PermissionService
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
    this.hasViewProfilePermission = this.permissionService.checkPermission("Read user details");
    if(this.hasViewProfilePermission) {
      this.userService.getUserProfile().subscribe((data) => {
        if (data.twoFactorMethod == 'NONE') {
          this.mfaEnabled = 'disabled';
        }
        else {
          this.mfaEnabled = 'enabled';
        }
      });
    }
  }

  ngOnInit() {
    this.checkPermissions();
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required,],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.mustMatch('newPassword', 'confirmPassword')
    })
  }

  private checkPermissions(): void{
    this.hasTOTP_permission = this.permissionService.checkPermission("Enable TOTP");
    this.hasSMS_permission = this.permissionService.checkPermission("Enable SMS");
    this.hasEMAIL_permission = this.permissionService.checkPermission("Enable EMAIL");
    this.hasEnableMFA_permission = 
    this.hasTOTP_permission || this.hasSMS_permission || this.hasEMAIL_permission;
    this.hasDisableMFA_permission = this.permissionService.checkPermission("Disable MFA");
    this.mfaMethods = [];
    if(this.hasTOTP_permission) {
      this.mfaMethods.push({ name: 'Time Based OTP by QR scanner', code: 'TOTP' })
    }
    if(this.hasSMS_permission) {
      this.mfaMethods.push({ name: 'Text OTP', code: 'SMS' })
    }
    if(this.hasEMAIL_permission) {
      this.mfaMethods.push({ name: 'Email OTP', code: 'EMAIL' })
    }
    if(this.mfaMethods.length == 1){
      this.twoFactorType = this.mfaMethods[0].code
    }
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
    this.authenticationService.disable2FA().subscribe(() => {
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
