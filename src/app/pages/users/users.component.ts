import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  imports: [],
  host: {
    class: 'h-100 d-flex gap-3 p-3',
  },
})
export class UsersComponent {}
