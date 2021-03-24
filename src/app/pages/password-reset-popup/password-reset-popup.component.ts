import { Component, OnInit } from '@angular/core';
import { WELCOME_TITLE } from 'src/app/static-values';

@Component({
  selector: 'app-password-reset-popup',
  templateUrl: './password-reset-popup.component.html',
  styleUrls: ['./password-reset-popup.component.css']
})
export class PasswordResetPopupComponent implements OnInit {

  title: string = WELCOME_TITLE;
  constructor() { }

  ngOnInit(): void {
  }

}
