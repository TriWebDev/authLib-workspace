import {
    Component,
    input,
    signal,
    ViewEncapsulation,
    ElementRef,
    OnInit,
} from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ToggleComponent } from './toggle/toggle.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-auth',
    imports: [LoginComponent, RegisterComponent, ToggleComponent, NgClass],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class AuthComponent implements OnInit {
    public theme = input<'classicB&W' | 'NeoViolet'>('classicB&W');
    // The showTemplate variable is for showing an extra component (toggle) in bigger devices, for changing between forms
    protected showTemplate = signal<'login' | 'register'>('register');
    // In smaller devices, the previous logic is managed only through the register and login components, through opacity
    protected showForm = signal<'login' | 'register'>('login');

    constructor(private el: ElementRef) { }

    /* Logic when initialising component */
    ngOnInit(): void {
        this.updateTheme();
    }

    private updateTheme() {
        const themeColors = this.getThemeColors();
        this.setComponentStyles('--primary-color', themeColors[0]);
        this.setComponentStyles('--secondary-color', themeColors[1]);
        this.setComponentStyles('--input-color', themeColors[2]);
    }

    private getThemeColors() {
        switch (this.theme()) {
            case 'classicB&W':
                return ['#111', '#fff', '#ddd'];

            // return ['#fff', '#000', '#999']
            case 'NeoViolet':
            default:
                return ['#372aac', '#fff', '#e5e7eb'];
        }
    }

    private setComponentStyles(variableName: string, color: string) {
        const hostElement = this.el.nativeElement;
        // this.renderer.setStyle(hostElement, variableName, color);
        hostElement.style.setProperty(variableName, color);
    }
    /* End logic when initialising component */

    /* Events logic */
    protected changeForm(form: 'register' | 'login') {
        this.showForm.set(form);
    }

    protected changeTemplate(template: 'login' | 'register') {
        this.showTemplate.set(template);
    }
}
