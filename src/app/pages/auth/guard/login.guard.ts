import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  private router: Router = inject(Router);
  constructor() {}

  async canActivate(): Promise<boolean> {
    if (!localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
