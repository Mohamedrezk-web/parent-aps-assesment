import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { map, Observable } from 'rxjs';
import { User } from './models/users.model';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  imports: [AsyncPipe, NgIf],
  host: {
    class:
      'row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-3 h-100  overflow-auto ',
  },
  providers: [UsersService],
})
export class UsersComponent {
  private _usersService: UsersService = inject(UsersService);
  user$: Observable<User[]> = this._usersService
    .getAll()
    .pipe(map((response) => response.data));
}
