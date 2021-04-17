import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { EmailOTPDialogComponent } from '../../components/email-otp-dialog/email-otp-dialog.component';
import { QRCodeComponent } from '../../components/qr-code/qr-code.component';
import { BackupCodeComponent } from '../../components/backup-codes/backup-codes.component';
import { SmsOTPDialogComponent } from '../../components/sms-otp-dialog/sms-otp-dialog.component';
import { ChangePasswordComponent } from '../../pages/changepassword/changepassword.component';
import { ResetPasswordComponent } from '../../pages/resetpassword/resetpassword.component';
import { EmailNotificationComponent } from '../../pages/email-notification/email-notification.component';
import { ForgotpasswordComponent } from '../../pages/forgotpassword/forgotpassword.component';
import { LoginComponent } from '../../pages/login/login.component';
import { MultiFactorLoginComponent } from '../../pages/mfa-login/mfa-login.component';
import { PasswordSettingsComponent } from '../../pages/password-settings/password-settings.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { PasswordResetPopupComponent } from '../../pages/password-reset-popup/password-reset-popup.component';
import { RegistrationConfirmationPopupComponent } from 'src/app/pages/registration-confirmation-popup/registration-confirmation-popup.component';
import { LoginOAuthComponent } from 'src/app/pages/login-oauth/login-oauth.component';
import { TooltipModule } from 'primeng/tooltip';
import { VerifyEmailComponent } from 'src/app/pages/verify-email/verify-email.component';
import { SessionTimeoutComponent } from 'src/app/pages/session-timeout/session-timeout.component';
import {  RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaFormsModule  } from 'ng-recaptcha';
import { environment } from '../../../environment/environment'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule,
    CheckboxModule,
    DropdownModule,
    TooltipModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  declarations: [
    LoginComponent,
    LoginOAuthComponent,
    MultiFactorLoginComponent,
    RegisterComponent,
    EmailNotificationComponent,
    ForgotpasswordComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    PasswordSettingsComponent,
    QRCodeComponent,
    BackupCodeComponent,
    SmsOTPDialogComponent,
    EmailOTPDialogComponent,
    PasswordResetPopupComponent,
    RegistrationConfirmationPopupComponent,
    VerifyEmailComponent,
    SessionTimeoutComponent
  ],
  providers:[
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.CLIENT_SIDE_SITE_KEY,
      } as RecaptchaSettings,
    }
  ],
  exports: [
    ChangePasswordComponent
  ]
})
export class AuthLayoutModule { }
