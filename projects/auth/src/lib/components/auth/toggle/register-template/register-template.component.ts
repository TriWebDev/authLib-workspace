import { Component, output } from '@angular/core';

@Component({
    selector: 'register-template',
    imports: [],
    templateUrl: './register-template.component.html',
    styleUrl: './register-template.component.css'
})
export class RegisterTemplateComponent {
    protected showRegister = output<void>();

    toggleTemplate() {
        this.showRegister.emit();
    }
}
