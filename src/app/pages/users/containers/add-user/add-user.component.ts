import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { UserFormComponent } from '../../components/user-form/user-form.component';

import { UserService } from '../../services/user.service';
import { LoaderComponent } from '@app/shared/components/loader.component';
import { UserFormValue } from '../../models/user-form.model';

@Component({
  selector: 'app-add-user',
  standalone: true,
  template: `
    @if(loading()) {
    <app-loader></app-loader>
    } @else {

    <app-user-form
      (onSubmit)="addUser($event)"
      [loading]="isAddingUser()"
    ></app-user-form>
    }
  `,
  host: {
    class: 'w-100 h-100 d-flex justify-content-center align-items-center',
  },
  imports: [UserFormComponent, LoaderComponent],
  providers: [UserService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent implements OnInit, OnDestroy {
  private _userService: UserService = inject(UserService);

  loading = this._userService.loading;
  isAddingUser = this._userService.userCrudLoading;
  constructor() {}

  ngOnInit(): void {}

  addUser(user: UserFormValue) {
    this._userService.addUser(user);
  }

  ngOnDestroy(): void {}
}
