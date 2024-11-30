import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { customerRoutes } from './features/customer/customer.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'homepage',
        pathMatch: 'full'
    },
    authRoutes,
    customerRoutes
];
