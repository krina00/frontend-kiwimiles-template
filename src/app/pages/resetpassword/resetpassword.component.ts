import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ERR_USER_NOT_FOUND } from 'src/app/errors/error.constants';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.component.html'
})
export class ResetPasswordComponent implements OnInit {

    resetPasswordForm: FormGroup;
    submitted = false;
    setPassword = true;
    tokenRetrived: string;
    errorMessage: string;
    error;

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.tokenRetrived = params['token'] ?? null;
        });
    }

    ngOnInit() {
        this.resetPasswordForm = this.formBuilder.group({
            newPassword: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
        }, {
            validator: this.mustMatch('newPassword', 'confirmPassword')

        })
    }

    onSubmit() {
        this.submitted = true;
        if (!this.resetPasswordForm.invalid) {
            this.authenticationService.resetPassword(this.resetPasswordForm.value.newPassword, this.tokenRetrived)
            .subscribe(
                () => { 
                    console.log('after reset')
                    this.router.navigate(['/password-reset-window']);
                 },
                error => {
                    if (error.status == 404) {
                        this.error = ERR_USER_NOT_FOUND;
                    }
                    else {
                        this.error = "Couldn't reset the password";
                    }
                }
            );
        }
    }

    mustMatch(controlName: string, matchingControlName: string) {
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
}
