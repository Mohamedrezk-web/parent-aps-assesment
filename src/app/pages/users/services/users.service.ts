import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { shareReplay, tap } from 'rxjs';
import { GetUsersApiResponse } from '@app/pages/users/models';
import { AlertService } from '@app/shared/services/alert.service';

@Injectable()
export class UsersService {
  private USERS_END_POINT = 'api/users';

  readonly loading = signal<boolean>(false);

  private http: HttpClient = inject(HttpClient);
  private readonly alertService = inject(AlertService);

  constructor() {}

  getAll(page: number) {
    this.loading.set(true);
    return this.http
      .get<GetUsersApiResponse>(
        `${environment.BASE_URL}${this.USERS_END_POINT}?page=${page}`
      )
      .pipe(
        tap(() => {
          this.alertService.notify('Users loaded', 'success');
        }),
        shareReplay()
      );
  }
}
