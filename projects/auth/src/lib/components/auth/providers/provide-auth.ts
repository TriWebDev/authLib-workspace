import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AUTH_CONFIG, AuthConfig } from '../config/auth.config';
import { AuthService } from '../services/auth.service';
import { AUTH_INTERCEPTOR } from '../interceptors/auth.interceptor';

export function provideAuth(config: AuthConfig): Provider[] {
    return [
        { provide: AUTH_CONFIG, useValue: config },
        AuthService,
        { provide: HTTP_INTERCEPTORS, useValue: AUTH_INTERCEPTOR, multi: true },
    ];
}
