import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { WELCOME_TITLE } from 'src/app/static-values';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent implements OnInit {
  title: string = WELCOME_TITLE;
  token: string;
  isVerified: boolean = false;
  error: string;
  constructor(
      private readonly activatedRoute: ActivatedRoute,
      private readonly authService: AuthenticationService 
  ) {
      this.activatedRoute.queryParams.subscribe((params:{token:string})=> {
        this.token = params.token;
      })
  }

  ngOnInit() {
   this.authService.emailVerification(this.token).subscribe(()=>{
    this.isVerified = true;
   },
   err => {
        this.error = "your email couldnot be verified\n" + "Error: " + JSON.stringify(err);
   })
  }
}
