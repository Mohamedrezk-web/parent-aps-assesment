import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs';
import { GetUsersApiResponse } from '../models/users.model';

@Injectable()
export class UsersService {
  private USERS_END_POINT = 'api/users';

  readonly loading = signal<boolean>(false);

  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getAll(page: number) {
    this.loading.set(true);
    return this.http
      .get<GetUsersApiResponse>(
        `${environment.BASE_URL}${this.USERS_END_POINT}?page=${page}`
      )
      .pipe(shareReplay());
  }
}
