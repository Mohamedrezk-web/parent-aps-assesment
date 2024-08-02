import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserViewComponent } from '../../components/user-view/user-view.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  template: `
    <app-user-view>
      <img
        [src]="userDetails()?.avatar"
        class="rounded-pill p-3 bg-secondary w-100 h-100"
        alt="..."
        left-view
      />
      <ng-container right-view>
        <h1>{{ userDetails()?.first_name }} {{ userDetails()?.last_name }}</h1>
        <p>{{ userDetails()?.email }}</p>
      </ng-container>
      <button class="btn btn-secondary" lift-view>Edit</button>
    </app-user-view>
  `,
  host: {
    class: 'd-flex w-100 h-50',
  },
  imports: [UserViewComponent],
  providers: [UserService],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  private dataSub!: Subscription;

  private _userService: UserService = inject(UserService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  userDetails = this._userService.getUserDetails();
  constructor() {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (this.userDetails()?.id && this.userDetails()?.id == userId) return;
      this.dataSub = this._userService.updateUser(userId);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.dataSub?.unsubscribe();
  }
}
