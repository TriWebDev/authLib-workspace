import { NgClass } from '@angular/common';
import {
    Component,
    inject,
    input,
    OnInit,
    output,
    signal,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AUTH_CONFIG } from '../../config/auth.config';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    imports: [NgClass, FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    public isSmallDevice = input<boolean>(
        window.matchMedia('(max-width: 800px)').matches
    );

    public invisible = input<boolean>(false);
    protected showRegisterForm = output<'register'>();

    private authService = inject(AuthService);
    private config = inject(AUTH_CONFIG);
    private router = inject(Router);
    protected feedbackChange = output<{ ok: boolean, message: string }>();

    protected loginForm = new FormGroup({
        email: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email],
        }),
        password: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(3)],
        }),
    });

    /* Visual changes */
    changeToSignUpForm(event: MouseEvent) {
        event.preventDefault();
        this.showRegisterForm.emit('register');
    }
    /* End visual changes */

    /* Form validations */
    isValidEmail() {
        return (
            this.loginForm.controls.email.touched &&
            this.loginForm.controls.email.valid
        );
    }

    isInvalidEmail() {
        return (
            this.loginForm.controls.email.touched &&
            !this.loginForm.controls.email.valid
        );
    }

    isValidPassword() {
        return (
            this.loginForm.controls.password.touched &&
            this.loginForm.controls.password.valid
        );
    }

    isInvalidPassword() {
        return (
            this.loginForm.controls.password.touched &&
            !this.loginForm.controls.password.valid
        );
    }

    /* End form validations */

    /* Form send logic */
    login() {
        const userInfo = this.loginForm.getRawValue();
        this.authService.login(userInfo).subscribe({
            next: (response) => {
                if (response.ok) {
                    const token = response.toString();
                    localStorage.setItem('token', token);
                    this.router.navigate([this.config.loginRedirectionUrl]);
                } 
                this.loginForm.reset();
                
                // Restarting the feedback message if everything goes well
                this.feedbackChange.emit({
                    ok: true,
                    message: ''
                });
            },
            error: (errorResponse) => {
                const sentMessage = errorResponse.error.messageToShow;
                this.feedbackChange.emit({
                    ok: false,
                    message: sentMessage ? sentMessage : 'An error has occurred'
                })
            }
        });
    }
}
