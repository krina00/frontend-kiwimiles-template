import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../user';
import { MINIMUM_PASSWORD_LENGTH } from '../../static-values'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  passwordStrength: string;
  submitted = false;
  active = true;
  user: User;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(MINIMUM_PASSWORD_LENGTH)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registrationForm.controls; }

  private mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  private onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      console.log(this.registrationForm);
      console.log('invalid data');
      return;
    }
    this.user = {
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    }
    this.authenticationService.register(this.user).subscribe(()=>{
      this.router.navigate(['/registration-completion-window']);
    });
    this.active = false;
  }

  private signUpWithGoogle(): void {
    this.authenticationService.loginWithGoogle()
    .subscribe(data => {
     console.log("data returned");
     console.log(data);
    },
    error => {
     location.href = 'http://localhost:8080/v1/auth/google';
    });
  }

  private signUpWithFacebook(): void {
    this.authenticationService.loginWithFacebook()
    .subscribe(data => {
     console.log("data returned");
     console.log(data);
    },
    error => {
     location.href = 'http://localhost:8080/v1/auth/facebook';
    });
  }

  private checkPassword(){
    const password: string = this.registrationForm.value.password;
    if(!password){
      this.passwordStrength = null;
      return;
    }
    const strongPasswordRegex: RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumPasswordRegex: RegExp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if(password.match(strongPasswordRegex)) this.passwordStrength = "strong";
    else if(password.match(mediumPasswordRegex)) this.passwordStrength = "medium";
    else this.passwordStrength = "weak";
  }

}
