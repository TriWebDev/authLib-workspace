import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'register',
    imports: [NgClass, FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    public isSmallDevice = input<boolean>(window.matchMedia('(max-width: 800px)').matches);
    public invisible = input<boolean>();
    protected showLoginForm = output<'login'>();

    private authService = inject(AuthService);
    protected userInfo = { name: '', email: '', password: '' }

    /* Visual changes */
    changeToLoginForm(event: MouseEvent) {
        event.preventDefault();
        this.showLoginForm.emit('login');
    }
    /* End visual changes */

    /* Form send logic */
    register() {
        this.authService.register(this.userInfo).subscribe();
    }

}
