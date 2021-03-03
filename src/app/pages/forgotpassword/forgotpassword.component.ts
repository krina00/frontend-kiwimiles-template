import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  private Userform: FormGroup;
  private submitted: boolean = false;
  private error: string;
  private active: boolean = true;


  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {

    this.Userform = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

    })
  }
  async onSubmit() {
    this.submitted = true;
    if (!this.Userform.invalid) {
      await this.authenticationService.forgotpassword(this.Userform.value.email).toPromise()
      .catch(error => {
        this.error = error;
        console.log(error.message);
      });
      this.active = false;
    }
    else {
      console.error('Invalid data!');
    }

  }
}
