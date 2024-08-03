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
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/users/users.component').then((c) => c.UsersComponent),
      },
      {
        path: 'user-details/:id',
        loadComponent: () =>
          import(
            './pages/users/containers/user-details/user-details.component'
          ).then((c) => c.UserDetailsComponent),
      },
      {
        path: 'user-details/:id/update',
        loadComponent: () =>
          import('./pages/users/components/user-form/user-form.component').then(
            (c) => c.UserFormComponent
          ),
      },
    ],
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
