import { Routes } from '@angular/router';
import { sessionGuard } from './guards/session-guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/clietns',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'clients',
    loadComponent: () =>
      import('./features/clients/components/clients/clients.component').then(
        (m) => m.ClientsComponent
      ),
    canActivate: [sessionGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
