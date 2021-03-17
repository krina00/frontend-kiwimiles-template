import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { countrycodes } from 'src/app/constants/country-codes.constant';
import { DropdownDTO } from 'src/app/dto/dropdown.dto';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-sms-otp',
  templateUrl: './sms-otp-dialog.component.html',

})
export class SmsOTPDialogComponent implements OnInit {
  @Output() otpEmitter = new EventEmitter<number>();
  phoneNumber: string;
  phoneNumberCountryCode: string = '+91';
  otpCode: number;
  enableCodeInput: boolean = false;
  error: string;
  selectedCountry: string;
  countries: DropdownDTO[] = countrycodes;
  constructor(
    private ref: DynamicDialogRef,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
  }
  
  private validatePhoneNumber(phone:string){
    if(!phone) return false;
    if(!(phone.length == 10)) return false;
    const pattern: RegExp = /[0-9]{10}/g;
    if(!phone.match(pattern)) return false;
    return true;
  }

  sendPhone(): void {
    if(!this.validatePhoneNumber(this.phoneNumber)) {
      this.error = "Please enter correct number"
      return;
    } 
    this.error = null;
    const phoneNumberWithCountryCode: string = this.phoneNumberCountryCode + this.phoneNumber;
    this.authenticationService.enableSms2FA(phoneNumberWithCountryCode).subscribe(() => {
      this.enableCodeInput = true;
    });
  }
  closeDialog() {
    this.ref.close(this.otpCode);
  }
}

