import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { UserFormComponent } from '../../components/user-form/user-form.component';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  template: ` <app-user-form></app-user-form> `,
  host: {
    class: 'w-100 h-100 d-flex justify-content-center align-items-center',
  },
  imports: [UserFormComponent],
  providers: [UserService],
})
export class AddUserComponent implements OnInit, OnDestroy {
  private _userService: UserService = inject(UserService);

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
