import { NgClass } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

@Component({
    selector: 'register',
    imports: [NgClass],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    protected isSmallDevice = window.matchMedia('(max-width: 800px)').matches;
    public invisible = input<boolean>();
    protected showLoginForm = output<'login'>();

    changeToLoginForm(event: MouseEvent) {
        event.preventDefault();
        this.showLoginForm.emit('login');
    }
}
