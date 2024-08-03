import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { UserFormComponent } from '@app/pages/users/components';

import { UserService } from '@app/pages/users/services/user.service';
import { LoaderComponent } from '@app/shared/components/loader.component';
import { UserFormValue } from '@app/pages/users/models';
import { Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';

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
  private router: Router = inject(Router);
  subscription!: Subscription;

  loading = this._userService.loading;
  isAddingUser = this._userService.userCrudLoading;
  constructor() {}

  ngOnInit(): void {}

  addUser(user: UserFormValue) {
    this.subscription = this._userService
      .addUser(user)
      .pipe(tap(() => this.router.navigate(['../'])))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
