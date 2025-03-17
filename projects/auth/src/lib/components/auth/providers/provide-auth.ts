import { Provider } from '@angular/core';
import { AUTH_CONFIG, AuthConfig } from '../config/auth.config';

export function provideAuth(config: AuthConfig): Provider[] {
    return [
        { provide: AUTH_CONFIG, useValue: config}
    ];
}
