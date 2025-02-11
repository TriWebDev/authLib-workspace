import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from 'auth';

@Component({
  selector: 'app-root',
  imports: [AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
