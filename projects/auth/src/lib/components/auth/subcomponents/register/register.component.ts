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
    protected showLoginForm = output<'login'>();

    private authService = inject(AuthService);
    protected registerForm = new FormGroup({
            name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
            email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email]}),
            password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)] })
    });

    /* Visual changes */
    changeToLoginForm(event: MouseEvent) {
        event.preventDefault();
        this.showLoginForm.emit('login');
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
        this.authService.register(userInfo).subscribe();
        this.registerForm.reset();
    }

}
