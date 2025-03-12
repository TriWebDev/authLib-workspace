import { NgClass } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'login',
  imports: [NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent  {
    // This might be changed in the future to events just in case the window screen width could change
    // Posible solution -> BreakpointObserver
    protected isSmallDevice = window.matchMedia("(max-width: 800px)").matches;
    public invisible = input<boolean>(false);
    protected showRegisterForm = output<'register'>();

    changeToSignUpForm(event: MouseEvent) {
        event.preventDefault();
        this.showRegisterForm.emit('register');
    }

}
