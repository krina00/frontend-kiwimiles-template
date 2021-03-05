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
    DropdownModule
  ],
  declarations: [
    LoginComponent,
    MultiFactorLoginComponent,
    RegisterComponent,
    EmailNotificationComponent,
    ForgotpasswordComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    PasswordSettingsComponent,
    QRCodeComponent,
    SmsOTPDialogComponent,
    EmailOTPDialogComponent,
    PasswordResetPopupComponent,
    RegistrationConfirmationPopupComponent
  ],
  exports: [
    ChangePasswordComponent
  ]
})
export class AuthLayoutModule { }
