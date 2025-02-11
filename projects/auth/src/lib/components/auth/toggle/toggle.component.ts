import { Component, input, output, signal } from '@angular/core';
import { LoginTemplateComponent } from "./login-template/login-template.component";
import { RegisterTemplateComponent } from "./register-template/register-template.component";
import { NgClass } from '@angular/common';

@Component({
    selector: 'toggle',
    imports: [LoginTemplateComponent, RegisterTemplateComponent, NgClass],
    templateUrl: './toggle.component.html',
    styleUrl: './toggle.component.css'
})
export class ToggleComponent {
    protected initialTemplate = input<'login' | 'register'>('register');
    protected actualTemplate = signal<'login' | 'register'>(this.initialTemplate());
    protected changeToggle = output<'login' | 'register'>();

    showRegisterForm() {
        this.actualTemplate.set('login');
        this.changeToggle.emit('login')
    }

    showLoginForm() {
        this.actualTemplate.set('register');
        this.changeToggle.emit('register');
    }
}
