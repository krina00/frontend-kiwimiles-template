import { Component, OnInit } from '@angular/core';
import { WELCOME_TITLE } from 'src/app/static-values';

@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.css']
})
export class SessionTimeoutComponent implements OnInit {

  title: string = WELCOME_TITLE;
  constructor() { }

  ngOnInit(): void {
  }

}
