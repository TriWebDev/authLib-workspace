import { Component, ElementRef, input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from './subcomponents/login/login.component';
import { RegisterComponent } from './subcomponents/register/register.component';
import { ToggleComponent } from "./subcomponents/toggle/toggle.component";
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-auth',
    imports: [LoginComponent, RegisterComponent, ToggleComponent, NgClass],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class AuthComponent implements OnInit {
    public theme = input<'classicB&W' | 'neoViolet' | 'custom'>('custom');

    public primary = input<string>('#372aac');
    public secundary = input<string>('#fff');
    public input = input<string>('#e5e7eb');

    // The showTemplate variable is for showing an extra component (toggle) in bigger devices, for changing between forms
    protected showTemplate = signal<'login' | 'register'>('register');
    // In smaller devices, the previous logic is managed only through the register and login components, through opacity
    protected showForm = signal<'login' | 'register'>('login');
    protected isSmallDevice = signal(
        window.matchMedia('(max-width: 800px)').matches
    );

    protected feedbackMessage = signal<{ ok: boolean, message: string }>({ ok: true, message: ''});

    constructor(private el: ElementRef) { }

    /* Logic when initialising component */
    ngOnInit(): void {
        if (this.theme() === 'custom') {
            this.setComponentStyles('--primary-color', this.primary());
            this.setComponentStyles('--secondary-color', this.secundary());
            this.setComponentStyles('--input-color', this.input());
        } else {
            this.updateTheme();
        }
        this.startSmallerDeviceChecker();
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
            case 'neoViolet':
                return ['#372aac', '#fff', '#e5e7eb'];
            default:
                // return ['#372aac', '#fff', '#e5e7eb'];
                return ['#111', '#fff', '#ddd'];
        }
    }

    private setComponentStyles(variableName: string, color: string) {
        const hostElement = this.el.nativeElement;
        // this.renderer.setStyle(hostElement, variableName, color);
        hostElement.style.setProperty(variableName, color);
    }

    private startSmallerDeviceChecker() {
        const mediaQuery = window.matchMedia('(max-width: 800px)');

        const updateScreenSize = (event: MediaQueryListEvent) => {
            this.isSmallDevice.set(event.matches);

            // FIXME: This should be changed to a better solution
            this.resetFormsView();
        };

        mediaQuery.addEventListener('change', updateScreenSize);
    }

    private resetFormsView() {
        this.showForm.set('login');
        this.showTemplate.set('register');
    }
    /* End logic when initialising component */

    /* Events logic */
    protected changeForm(form: 'register' | 'login') {
        this.showForm.set(form);
    }

    protected changeTemplate(template: 'login' | 'register') {
        this.showTemplate.set(template);
    }

    protected changeFeedbackMessage(feedbackMessage: { ok: boolean, message: string }) {
        this.feedbackMessage.set(feedbackMessage);
    }
}
