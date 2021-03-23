import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-backup-code',
  templateUrl: './backup-codes.component.html',

})
export class BackupCodeComponent implements OnInit {
  backupCodes: string[];
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
  }

  ngOnInit() {
    this.backupCodes = this.config.data.backupCodes;
    console.log(this.backupCodes);
  }
  copyCodes(){
    const copyCodes: string = this.backupCodes.toString();
    const cleanText = copyCodes.replace(/<\/?[^>]+(>|$)/g, '');
    const x = document.createElement('TEXTAREA') as HTMLTextAreaElement;
    x.value = cleanText;
    document.body.appendChild(x);
    x.select();
    document.execCommand('copy');
    document.body.removeChild(x);
    alert("Codes are copied to clipboard")
  }
  closeDialog() {
    this.ref.close();
  }
}

