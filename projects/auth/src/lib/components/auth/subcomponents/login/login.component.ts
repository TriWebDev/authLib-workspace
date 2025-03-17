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
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'login',
    imports: [NgClass, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    public isSmallDevice = input<boolean>(window.matchMedia('(max-width: 800px)').matches);

    public invisible = input<boolean>(false);
    protected showRegisterForm = output<'register'>();

    protected userInfo = { email: '', password: '' };
    private authService = inject(AuthService);

    /* Visual changes */
    changeToSignUpForm(event: MouseEvent) {
        event.preventDefault();
        this.showRegisterForm.emit('register');
    }
    /* End visual changes */

    /* Form send logic */
    login() {
        this.authService.login(this.userInfo).subscribe((response) => {
            const token = response.toString();
            localStorage.setItem('token', token);
        });
    }
}
