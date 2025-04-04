import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_CONFIG } from '../config/auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private config = inject(AUTH_CONFIG);


    login(credentials: { email: string; password: string }) {
        return this.http.post(`${this.config.apiUrl}/login`, credentials, { observe: 'response' })
    }

    register(userInfo: { name: string, email: string; password: string }) {
        return this.http.post(`${this.config.apiUrl}/create`, userInfo, { observe: 'response' });
    }
}
