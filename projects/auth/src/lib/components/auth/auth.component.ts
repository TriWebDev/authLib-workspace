import { Component, signal, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from './subcomponents/login/login.component';
import { RegisterComponent } from './subcomponents/register/register.component';
import { ToggleComponent } from "./subcomponents/toggle/toggle.component";
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-auth',
    imports: [LoginComponent, RegisterComponent, ToggleComponent, NgClass],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent {
    // The showTemplate variable is for showing an extra component (toggle) in bigger devices, for changing between forms
    protected showTemplate = signal<'login' | 'register'>('register');

    // In smaller devices, the previous logic is managed only through the register and login components, through opacity
    protected showForm = signal<'login' | 'register'>('login');


    changeForm(form: 'register' | 'login') {
        this.showForm.set(form);
    }


    changeTemplate(template: 'login' | 'register') {
        this.showTemplate.set(template);
    }
}
