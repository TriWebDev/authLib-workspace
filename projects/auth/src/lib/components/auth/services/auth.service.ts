import { Inject, inject, Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AUTH_CONFIG, AuthConfig } from '../config/auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    // private config = inject(AUTH_CONFIG);
    private userSubject = new BehaviorSubject<any>(null);
    user$ = this.userSubject.asObservable();

    constructor(@Inject(AUTH_CONFIG) private config: AuthConfig) {
        console.log('AuthService config:', this.config);
    }

    login(credentials: { email: string; password: string }) {
        return this.http.post(`${this.config.apiUrl}/login`, credentials);
    }

    logout() {
        localStorage.removeItem('token');
        this.userSubject.next(null);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}
