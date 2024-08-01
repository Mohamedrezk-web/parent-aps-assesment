import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  constructor() {}

  async canActivate(): Promise<boolean> {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
