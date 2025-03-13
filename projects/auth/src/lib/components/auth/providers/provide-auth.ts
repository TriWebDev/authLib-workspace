import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { AUTH_INTERCEPTOR } from '../interceptors/auth.interceptor';
import { AUTH_CONFIG, AuthConfig } from '../config/auth.config';

export function provideAuth(config: AuthConfig): Provider[] {
    console.log(config.apiUrl);
    return [
        { provide: AUTH_CONFIG, useValue: config},
        // AuthService,
        { provide: HTTP_INTERCEPTORS, useValue: AUTH_INTERCEPTOR, multi: true },
    ];
}
