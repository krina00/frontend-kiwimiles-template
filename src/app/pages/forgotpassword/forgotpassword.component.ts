import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  Userform: FormGroup;
  submitted = false;
  error: string;
  active = true;


  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {

    this.Userform = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

    })
  }
  onSubmit() {
    this.submitted = true;
    if (!this.Userform.invalid) {
      this.authenticationService.forgotpassword(this.Userform.value.email).subscribe(
        data => { this.active = false; },
        error => {
          this.error = error;
          console.log(error.message);
        }
      );
    }
    else {
      console.error('Invalid data!');
    }

  }
}
