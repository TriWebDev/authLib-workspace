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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    selector: 'login',
    imports: [NgClass, FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})

export class LoginComponent {
    
    public isSmallDevice = input<boolean>(window.matchMedia('(max-width: 800px)').matches);

    public invisible = input<boolean>(false);
    protected showRegisterForm = output<'register'>();

    // protected userInfo = { email: '', password: '' };
    private authService = inject(AuthService);
    protected loginForm = new FormGroup({
        email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email]}),
        password: new FormControl<string>('', {nonNullable: true, validators: Validators.required })
    });

    /* Visual changes */
    changeToSignUpForm(event: MouseEvent) {
        event.preventDefault();
        this.showRegisterForm.emit('register');
    }
    /* End visual changes */

    /* Form send logic */
    login() {
        // FIXME: userInfo variable must be changed to the one according to the loginForm
        const userInfo = this.loginForm.getRawValue();
        this.authService.login(userInfo).subscribe((response) => {
            const token = response.toString();
            localStorage.setItem('token', token);
        });
    }
}
