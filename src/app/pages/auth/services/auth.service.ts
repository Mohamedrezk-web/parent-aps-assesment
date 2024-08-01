import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly currentUser = signal<undefined | string | null>(undefined);

  constructor() {}

  updateCurrentUser(email: string | null) {
    this.currentUser.set(email);
  }
}
