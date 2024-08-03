import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, finalize, map, shareReplay, tap } from 'rxjs';
import { GetUserApiResponse } from '../models/user.model';
import { User } from '../models/users.model';

@Injectable()
export class UserService {
  private USERS_END_POINT = 'api/users';
  private readonly userDetails = signal<User | null>(null);

  readonly loading = signal<boolean>(false);

  private http: HttpClient = inject(HttpClient);

  constructor() {}

  private getById(id: number) {
    this.loading.set(true);
    return this.http
      .get<GetUserApiResponse>(
        `${environment.BASE_URL}${this.USERS_END_POINT}/${id}`
      )
      .pipe(
        map((response) => response.data),
        shareReplay(),
        finalize(() => this.loading.set(false))
      );
  }

  updateUserDetails(id: number) {
    return this.getById(id)
      .pipe(tap((details) => this.userDetails.set(details)))
      .subscribe();
  }

  updateUser(id: number, user: User) {
    return this.http
      .put(`${environment.BASE_URL}${this.USERS_END_POINT}/${id}`, user)
      .pipe(
        catchError((error) => {
          console.error(error);
          return error;
        }),
        tap(() => {}),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  addUser(user: User) {
    return this.http
      .post(`${environment.BASE_URL}${this.USERS_END_POINT}`, user)
      .pipe(
        catchError((error) => {
          console.error(error);
          return error;
        }),
        tap(() => {}),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  deleteUser(id: number) {
    return this.http
      .delete(`${environment.BASE_URL}${this.USERS_END_POINT}/${id}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return error;
        }),
        tap(() => {}),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  getUserDetails() {
    return this.userDetails;
  }
}
