import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  imports: [],
  host: {
    class: 'h-100 d-flex gap-3 p-3',
  },
  providers: [UsersService],
})
export class UsersComponent implements OnInit {
  private _usersService: UsersService = inject(UsersService);
  ngOnInit(): void {
    this._usersService.getAll().subscribe((res) => {
      console.log(res);
    });
  }
}
