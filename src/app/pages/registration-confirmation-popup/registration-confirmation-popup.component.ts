import { Component, OnInit } from '@angular/core';
import { WELCOME_TITLE } from 'src/app/static-values';

@Component({
  selector: 'app-registration-confirmation-popup',
  templateUrl: './registration-confirmation-popup.component.html',
  styleUrls: ['./registration-confirmation-popup.component.css']
})
export class RegistrationConfirmationPopupComponent implements OnInit {

  title: string = WELCOME_TITLE;
  constructor() { }

  ngOnInit(): void {
  }

}
