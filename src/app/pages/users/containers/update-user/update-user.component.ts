import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { UserFormComponent } from '../../components/user-form/user-form.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoaderComponent } from '@app/shared/components/loader.component';
import { UserFormValue } from '../../models/user-form.model';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-update-user',
  standalone: true,
  template: `
    @if (loading()) {

    <app-loader></app-loader>
    } @else {

    <app-user-form
      [formValue]="userDetails()"
      [loading]="isUpdatingUser()"
      (onSubmit)="updateUser($event)"
    ></app-user-form>
    }
  `,
  host: {
    class: 'w-100 h-100 d-flex justify-content-center align-items-center',
  },
  imports: [UserFormComponent, LoaderComponent],
  providers: [UserService],
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  private dataSub!: Subscription;
  private updateSub!: Subscription;

  private _userService: UserService = inject(UserService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  userDetails = this._userService.getUserDetails();
  loading = this._userService.loading;
  isUpdatingUser = this._userService.userCrudLoading;

  constructor() {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (this.userDetails()?.id && this.userDetails()?.id == userId) return;
      this.dataSub = this._userService.updateUserDetails(userId);
    });
  }

  updateUser(user: UserFormValue) {
    this.updateSub = this._userService.updateUser(user);
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.dataSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }
}
