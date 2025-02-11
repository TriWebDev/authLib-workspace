import { Component, signal, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ToggleComponent } from "./toggle/toggle.component";
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-auth',
    imports: [LoginComponent, RegisterComponent, ToggleComponent, NgClass],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent {
    protected showTemplate = signal<'login' | 'register'>('register');

    changeTemplate(template: 'login' | 'register') {
        this.showTemplate.set(template);
    }
}
