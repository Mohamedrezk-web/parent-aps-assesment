import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { UserFormComponent } from '../../components/user-form/user-form.component';

import { UserService } from '../../services/user.service';
import { LoaderComponent } from '@app/shared/components/loader.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  template: `
    @if(loading()) {
    <app-loader></app-loader>
    } @else {

    <app-user-form [loading]="loading()"></app-user-form>
    }
  `,
  host: {
    class: 'w-100 h-100 d-flex justify-content-center align-items-center',
  },
  imports: [UserFormComponent, LoaderComponent],
  providers: [UserService],
})
export class AddUserComponent implements OnInit, OnDestroy {
  private _userService: UserService = inject(UserService);

  loading = this._userService.loading;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
