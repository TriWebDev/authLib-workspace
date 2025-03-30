import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'register',
    imports: [NgClass, FormsModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    public isSmallDevice = input<boolean>(window.matchMedia('(max-width: 800px)').matches);
    public invisible = input<boolean>();
    // This output is for small devices
    protected showLoginForm = output<'login'>();

    // This output is for bigger devices
    protected showTemplate = output<'register'>();

    protected feedbackChange = output<{ ok: boolean, message: string }>();


    private authService = inject(AuthService);
    protected registerForm = new FormGroup({
            name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
            email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email]}),
            password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)] })
    });

    /* Visual changes */
    // Logic for small devices
    changeToLoginForm(event: MouseEvent) {
        event.preventDefault();
        this.changeToLoginInSmallDevices();
    }

    changeToLoginInSmallDevices() {
        this.showLoginForm.emit('login');
    }

    changeToLoginInBiggerDevices() {
        this.showTemplate.emit('register');
    }
    /* End visual changes */

    /* Form validations */
    isValidName() {
        return this.registerForm.controls.name.touched && this.registerForm.controls.name.valid;
    }

    isInvalidName() {
        return this.registerForm.controls.name.touched && !this.registerForm.controls.name.valid;
    }

    isValidEmail() {
        return this.registerForm.controls.email.touched && this.registerForm.controls.email.valid;
    }

    isInvalidEmail() {
        return this.registerForm.controls.email.touched && !this.registerForm.controls.email.valid;
    }

    isValidPassword() {
        return this.registerForm.controls.password.touched && this.registerForm.controls.password.valid;
    }

    isInvalidPassword() {
        return this.registerForm.controls.password.touched && !this.registerForm.controls.password.valid;
    }
    /* End form validations */


    /* Form send logic */
    register() {
        const userInfo = this.registerForm.getRawValue();
        this.authService.register(userInfo).subscribe({
            next: (response) => {
                if (response.ok) {
                    this.changeToLoginInSmallDevices();
                    // Restarting the feedback message if everything goes well
                    this.changeToLoginInBiggerDevices();
                    this.feedbackChange.emit({
                        ok: true,
                        message: 'Created account succesfully'
                    });
                }
                this.registerForm.reset();

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
