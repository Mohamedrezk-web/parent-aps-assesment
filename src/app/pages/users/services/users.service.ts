import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { concatMap, map } from 'rxjs';
import { GetUsersApiResponse } from '../models/users.model';

@Injectable()
export class UsersService {
  private LOGIN_END_POINT = 'api/login';

  readonly loading = signal<boolean>(false);

  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getAll() {
    this.loading.set(true);
    return this.http.get<GetUsersApiResponse>(
      `${environment.BASE_URL}${this.LOGIN_END_POINT}`
    );
  }
}
