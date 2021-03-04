import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-sms-otp',
  templateUrl: './sms-otp-dialog.component.html',

})
export class SmsOTPDialogComponent implements OnInit {
  @Output() otpEmitter = new EventEmitter<number>();
  phoneNumber: string;
  otpCode: number;
  enableCodeInput: boolean = false;
  constructor(
    private ref: DynamicDialogRef,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
  }
  sendPhone() {
    this.authenticationService.enableSms2FA(this.phoneNumber).subscribe(() => {
      this.enableCodeInput = true;
    });
  }
  closeDialog() {
    this.ref.close(this.otpCode);
  }
}

