import { Component, OnInit } from '@angular/core';
import { WELCOME_TITLE } from 'src/app/static-values';

@Component({
  selector: 'app-email-notification',
  templateUrl: './email-notification.component.html',
})
export class EmailNotificationComponent implements OnInit {
  title: string = WELCOME_TITLE;
  constructor(    
  ) {}

  ngOnInit() {
   

  }

  
}
