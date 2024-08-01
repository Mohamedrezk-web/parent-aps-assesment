import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginFormValue } from '../models';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private LOGIN_END_POINT = 'api/login';

  readonly loading = signal<boolean>(false);

  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  constructor() {}

  login(userCredentials: LoginFormValue) {
    this.loading.set(true);
    return this.http
      .post<{ token: string }>(
        `${environment.BASE_URL}${this.LOGIN_END_POINT}`,
        userCredentials
      )
      .pipe(
        map((response) => {
          this.loading.set(false);
          localStorage.setItem('token', response.token);
          this.authService.updateCurrentUser(userCredentials.email);
          this.router.navigateByUrl('/');
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.updateCurrentUser(null);
    this.router.navigateByUrl('/login');
  }
}
