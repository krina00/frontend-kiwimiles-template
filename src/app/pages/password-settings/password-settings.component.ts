import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { QRCodeComponent } from '../../components/qr-code/qr-code.component';
import { SmsOTPDialogComponent } from '../../components/sms-otp-dialog/sms-otp-dialog.component';
import { EmailOTPDialogComponent } from '../../components/email-otp-dialog/email-otp-dialog.component';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  providers: [DialogService, DynamicDialogConfig]
})
export class PasswordSettingsComponent implements OnInit {

  retrievedQRCode;
  showQr: boolean = false;
  currentUserId: number = +localStorage.getItem('id');
  @Input() twoFactorType: 'TOTP' | 'SMS' | 'EMAIL';
  @Output() successFlagEmitter = new EventEmitter<boolean>();
  errorMessage: string;

  constructor(
    private config: DynamicDialogConfig,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService
  ) {

  }

  ngOnInit() {
    this.enable2FA();
  }

  private enable2FA(): void {
    if (this.twoFactorType === 'TOTP') {
      this.enableQR2FA();
    }
    else if (this.twoFactorType === 'SMS') {
      this.enableSMS2FA();
    }
    else if (this.twoFactorType == 'EMAIL') {
      this.enableEmail2FA();
    }
    else {
      console.error('two factor method type error: with type::');
      console.error(this.twoFactorType)
    }
  }

  private enableQR2FA(): void {
    this.authenticationService.enableTotp2FA(this.currentUserId).subscribe((image) => {
      this.retrievedQRCode = image.img;
      const ref = this.dialogService.open(QRCodeComponent, {
        data: {
          qrCodeLink: this.retrievedQRCode
        },
        header: 'Enable QR Based two-factor Authentication',
        width: '20%',
      });

      ref.onClose.subscribe(async (otpCode: number) => {
        this.sendTOtp(otpCode);
      });
    });
  }

  private enableSMS2FA(): void {
    const ref = this.dialogService.open(SmsOTPDialogComponent, {
      data: {
        qrCodeLink: this.retrievedQRCode
      },
      header: 'Enable SMS Based two-factor Authentication',
      width: '30%',
    });

    ref.onClose.subscribe(async (otpCode: number) => {
      this.sendSmsOtp(otpCode);
    });

  }

  private enableEmail2FA(): void {
    const ref = this.dialogService.open(EmailOTPDialogComponent, {
      data: {
        qrCodeLink: this.retrievedQRCode
      },
      header: 'Enable Email Based two-factor Authentication',
      width: '30%',
    });

    ref.onClose.subscribe(async (otpCode: number) => {
      this.sendEmailOtp(otpCode);
    });
  }

  private sendTOtp(otpCode: number): void {
    this.showQr = false;
    if (otpCode) {
      this.authenticationService.sendTotp(this.currentUserId, otpCode).subscribe((backupCodes) => {
        console.log(backupCodes);
        this.errorMessage = null;
        this.successFlagEmitter.emit(true);
      }, (err) => {
        this.errorMessage = "Please enter correct code!";
        this.successFlagEmitter.emit(false);
      });
    }
    else {
      this.successFlagEmitter.emit(false);
    }
  }

  private sendSmsOtp(otpCode: number): void {
    if (otpCode) {
      this.authenticationService.sendSmsOtp(this.currentUserId, otpCode).subscribe((backupCodes) => {
        console.log(backupCodes);
        this.errorMessage = null;
        this.successFlagEmitter.emit(true);
      }, (err) => {
        this.errorMessage = "Please enter correct code!";
        this.successFlagEmitter.emit(false);
      });
    }
    else {
      this.successFlagEmitter.emit(false);
    }
  }

  private sendEmailOtp(otpCode: number): void {
    if (otpCode) {
      this.authenticationService.sendEmailOtp(this.currentUserId, otpCode).subscribe((backupCodes) => {
        console.log(backupCodes);
        this.errorMessage = null;
        this.successFlagEmitter.emit(true);
      }, (err) => {
        this.errorMessage = "Please enter correct code!";
        this.successFlagEmitter.emit(false);
      });
    }
    else {
      this.successFlagEmitter.emit(false);
    }
  }
}

