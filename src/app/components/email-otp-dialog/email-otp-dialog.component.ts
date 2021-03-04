import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-email-otp',
  templateUrl: './email-otp-dialog.component.html',

})
export class EmailOTPDialogComponent implements OnInit {
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
    this.authenticationService.enableEmail2FA().subscribe();
  }
  closeDialog() {
    this.ref.close(this.otpCode);
  }
}

