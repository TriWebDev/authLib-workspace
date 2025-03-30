import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthImplementationComponent } from './components/auth-implementation/auth-implementation.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: '**',
        component: AuthImplementationComponent
    }
];
