import { Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/guard/auth.guard';
import { LoginGuard } from './pages/auth/guard/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./ui/layout/layout.component').then((c) => c.LayoutComponent),
    canActivate: [AuthGuard],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/containers/login/login.component').then(
        (c) => c.LoginComponent
      ),
    canActivate: [LoginGuard],
  },
];
