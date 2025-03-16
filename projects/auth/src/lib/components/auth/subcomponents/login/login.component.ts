import { NgClass } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'login',
  imports: [NgClass, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent  {
    // This might be changed in the future to events just in case the window screen width could change
    // Posible solution -> BreakpointObserver
    protected isSmallDevice = window.matchMedia("(max-width: 800px)").matches;
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
        this.authService.login(this.userInfo).subscribe();
    }

}
