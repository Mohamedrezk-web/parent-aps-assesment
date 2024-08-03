import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { UserFormComponent } from '@app/pages/users/components';
import { Subscription, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/pages/users/services/user.service';
import { LoaderComponent } from '@app/shared/components/loader.component';
import { UserFormValue } from '@app/pages/users/models';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  private dataSub!: Subscription;
  private updateSub!: Subscription;

  private _userService: UserService = inject(UserService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

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
    this.updateSub = this._userService
      .updateUser(user)
      .pipe(tap(() => this.router.navigate(['../'])))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.dataSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }
}
