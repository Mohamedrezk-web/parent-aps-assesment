import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginFormValue } from '@app/pages/auth/models';
import { catchError, map } from 'rxjs';
import { AuthService } from './auth.service';
import { AlertService } from '@app/shared/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private LOGIN_END_POINT = 'api/login';

  readonly loading = signal<boolean>(false);

  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private readonly alertService = inject(AlertService);

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
          this.alertService.notify('Login succeeded', 'success');
          this.router.navigateByUrl('/');
        }),
        catchError((error) => {
          this.alertService.notify('Cannot update user', 'danger');
          console.error(error);
          return error;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.updateCurrentUser(null);
    this.router.navigateByUrl('/login');
  }
}
