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

  private dynamicDownloadTxt() {
    this.dyanmicDownloadByHtmlTag({
      fileName: 'Backup Codes',
      text: this.backupCodes.toString()
    });
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    
    const element = document.createElement('a');
    const fileType = 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }
}

