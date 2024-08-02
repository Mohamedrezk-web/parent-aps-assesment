import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs';
import { GetUsersApiResponse } from '../models/users.model';

@Injectable()
export class UserService {
  private USERS_END_POINT = 'api/users';

  readonly loading = signal<boolean>(false);

  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getById(id: number) {
    this.loading.set(true);
    return this.http
      .get<GetUsersApiResponse>(
        `${environment.BASE_URL}${this.USERS_END_POINT}/${id}`
      )
      .pipe(shareReplay());
  }
}
