import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, finalize, map, shareReplay, tap } from 'rxjs';
import { GetUserApiResponse } from '../models/user.model';
import { User } from '../models/users.model';
import { UserFormValue } from '../models/user-form.model';

@Injectable()
export class UserService {
  private USERS_END_POINT = 'api/users';
  private readonly userDetails = signal<User | null>(null);

  readonly loading = signal<boolean>(false);
  readonly userCrudLoading = signal<boolean>(false);

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

  updateUser(user: UserFormValue) {
    this.userCrudLoading.set(true);
    return this.http
      .put(`${environment.BASE_URL}${this.USERS_END_POINT}/${user.id}`, user)
      .pipe(
        catchError((error) => {
          console.error(error);
          return error;
        }),
        tap(() => {}),
        finalize(() => this.userCrudLoading.set(false))
      )
      .subscribe();
  }

  addUser(user: UserFormValue) {
    this.userCrudLoading.set(true);
    return this.http
      .post(`${environment.BASE_URL}${this.USERS_END_POINT}`, user)
      .pipe(
        catchError((error) => {
          console.error(error);
          return error;
        }),
        tap(() => {}),
        finalize(() => this.userCrudLoading.set(false))
      )
      .subscribe();
  }

  deleteUser(id: number) {
    this.userCrudLoading.set(true);

    return this.http
      .delete(`${environment.BASE_URL}${this.USERS_END_POINT}/${id}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return error;
        }),
        tap(() => {}),
        finalize(() => this.userCrudLoading.set(false))
      )
      .subscribe();
  }

  getUserDetails() {
    return this.userDetails;
  }
}
