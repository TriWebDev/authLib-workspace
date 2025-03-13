import { Component, input, signal, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ToggleComponent } from "./toggle/toggle.component";
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-auth',
    imports: [LoginComponent, RegisterComponent, ToggleComponent, NgClass],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class AuthComponent {
    public theme = input<"light" | "dark" | "default">("dark");

    constructor(private el: ElementRef, private renderer: Renderer2) {

    }
    ngOnInit(): void {
        this.updateTheme();
    }
    // The showTemplate variable is for showing an extra component (toggle) in bigger devices, for changing between forms
    protected showTemplate = signal<'login' | 'register'>('register');

    // In smaller devices, the previous logic is managed only through the register and login components, through opacity
    protected showForm = signal<'login' | 'register'>('login');

    updateTheme() {
        const themeColors = this.getThemeColors();
        this.setComponentStyles('--primary-color', themeColors[0]);
        this.setComponentStyles('--secondary-color', themeColors[1]);
        this.setComponentStyles('--input-color', themeColors[2]);
    }

    getThemeColors() {
        switch (this.theme()) {
            case 'light':
                return ['#fff', '#000', '#999']
            case 'dark':
                return ['#000', '#fff', '#999']
            default:
                return ['#372aac', '#fff', '#e5e7eb']
        }
    }

    setComponentStyles(variableName: string, color: string) {
        const hostElement = this.el.nativeElement;
        this.renderer.setStyle(hostElement, variableName, color);
    }

    changeForm(form: 'register' | 'login') {
        this.showForm.set(form);
    }


    changeTemplate(template: 'login' | 'register') {
        this.showTemplate.set(template);
    }
}
