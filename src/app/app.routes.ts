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
          import('./pages/users/containers/user-view/user-view.component').then(
            (c) => c.UserViewComponent
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
