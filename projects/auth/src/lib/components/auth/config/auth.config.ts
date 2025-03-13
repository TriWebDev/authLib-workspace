import { InjectionToken } from '@angular/core';

export interface AuthConfig {
    apiUrl: string;
    // tokenStorage?: 'localStorage' | 'sessionStorage' | 'cookie';
    /* There will be more configurations in future versions */
}

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG');
