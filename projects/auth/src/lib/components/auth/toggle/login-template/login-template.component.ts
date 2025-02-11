import { Component, output } from '@angular/core';

@Component({
    selector: 'login-template',
    imports: [],
    templateUrl: './login-template.component.html',
    styleUrl: './login-template.component.css'
})
export class LoginTemplateComponent {
    protected showLogin = output<void>();

    toggleTemplate() {
        this.showLogin.emit();
    }
}
