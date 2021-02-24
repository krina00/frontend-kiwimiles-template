import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',

})
export class QRCodeComponent implements OnInit {
  qrCodeLink: string;
  @Output() otpEmitter = new EventEmitter<number>();
  otpCode: number;
  display: boolean = true;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
  }

  ngOnInit() {
    this.qrCodeLink = this.config.data.qrCodeLink;
  }
  closeDialog() {
    this.ref.close(this.otpCode);
  }
}

