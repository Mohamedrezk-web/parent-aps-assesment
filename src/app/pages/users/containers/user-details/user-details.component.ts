import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UserViewComponent } from '../../components/user-view/user-view.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '@app/shared/components/loader.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  template: `
    @if (loading()) {
    <app-loader>User</app-loader>
    } @else {

    <app-user-view>
      <img
        [ngSrc]="userDetails()?.avatar || ''"
        priority
        width="300"
        height="300"
        class="rounded-pill p-3 bg-secondary w-75 h-75"
        left-view
      />
      <ng-container right-view>
        <h1>{{ userDetails()?.first_name }} {{ userDetails()?.last_name }}</h1>
        <p>{{ userDetails()?.email }}</p>
      </ng-container>
      <ul class="list-group w-100" lift-view>
        <li
          class="list-group-item d-flex align-items-center justify-content-between"
        >
          <a
            class="text-bold text-secondary text-decoration-none"
            routerLink="../../"
          >
            <-- back
          </a>
          <button class="btn btn-secondary" (click)="navigateToUpdate()">
            Update
          </button>
        </li>
      </ul>
    </app-user-view>
    }
  `,
  host: {
    class: 'd-flex w-100 h-50 align-items-center justify-content-center',
  },
  imports: [UserViewComponent, RouterLink, LoaderComponent, NgOptimizedImage],
  providers: [UserService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  private dataSub!: Subscription;

  private _userService: UserService = inject(UserService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  userDetails = this._userService.getUserDetails();
  loading = this._userService.loading;
  constructor() {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (this.userDetails()?.id && this.userDetails()?.id == userId) return;
      this.dataSub = this._userService.updateUserDetails(userId);
    });
  }

  navigateToUpdate() {
    this.router.navigate(['update'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.dataSub?.unsubscribe();
  }
}
