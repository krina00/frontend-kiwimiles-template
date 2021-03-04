import { Routes } from '@angular/router';
import { PasswordResetPopupComponent } from 'src/app/pages/password-reset-popup/password-reset-popup.component';
import { ResetPasswordComponent } from 'src/app/pages/resetpassword/resetpassword.component';
import { ChangePasswordComponent } from '../../pages/changepassword/changepassword.component';
import { EmailNotificationComponent } from '../../pages/email-notification/email-notification.component';
import { ForgotpasswordComponent } from '../../pages/forgotpassword/forgotpassword.component';
import { LoginComponent } from '../../pages/login/login.component';
import { MultiFactorLoginComponent } from '../../pages/mfa-login/mfa-login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
  { path: 'auth/link/login', component: LoginComponent },
  { path: 'otp', component: MultiFactorLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'auth/link/reset-password', component: ResetPasswordComponent },
  { path: 'email-notification', component: EmailNotificationComponent },
  { path: 'password-reset-window', component: PasswordResetPopupComponent },
];
