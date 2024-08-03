import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { UsersService } from './services/users.service';
import { Observable, Subscription, tap } from 'rxjs';
import { GetUsersApiResponse } from './models/users.model';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import { LoaderComponent } from '@app/shared/components/loader.component';
import { RouterLink } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  imports: [
    AsyncPipe,
    NgIf,
    NgClass,
    NumberToArrayPipe,
    LoaderComponent,
    RouterLink,
  ],
  host: {
    class: 'h-100 w-100 d-flex flex-column overflow-auto px-3',
  },
  providers: [UsersService, UserService],
})
export class UsersComponent implements OnInit, OnDestroy {
  private readonly _usersService: UsersService = inject(UsersService);
  private readonly _userService: UserService = inject(UserService);

  user$: Observable<GetUsersApiResponse> = this._usersService.getAll(1);

  activePageIndex = signal(1);
  private readonly markedUserForDeleteId = signal<number | null>(null);
  private deleteSub!: Subscription;

  @ViewChild('closeModalButton', { static: false })
  closeModalButton!: ElementRef;

  ngOnInit(): void {}

  changePage(pageIndex: number) {
    this.user$ = this._usersService.getAll(pageIndex);
    this.activePageIndex.set(pageIndex);
  }

  changeToNextPage(stoppingNumber: number, activePageIndex: number) {
    if (activePageIndex == stoppingNumber) return;
    const newActiveIndex = activePageIndex + 1;
    this.activePageIndex.set(newActiveIndex);
    this.changePage(newActiveIndex);
  }

  changeToPreviousPage(stoppingNumber: number, activePageIndex: number) {
    if (activePageIndex == stoppingNumber) return;
    const newActiveIndex = activePageIndex - 1;
    this.activePageIndex.set(newActiveIndex);
    this.changePage(newActiveIndex);
  }

  markUserForDelete(id: number) {
    this.markedUserForDeleteId.set(id);
  }

  unMarkUserFromDelete() {
    this.markedUserForDeleteId.set(null);
  }

  deleteUser() {
    const id = this.markedUserForDeleteId();
    if (!id) return;
    this.deleteSub = this._userService
      .deleteUser(id)
      .pipe(
        tap(() => {
          this.closeModal();
          this.changePage(this.activePageIndex());
        })
      )
      .subscribe();
  }

  closeModal() {
    this.closeModalButton.nativeElement.click();
  }

  ngOnDestroy(): void {
    this.deleteSub?.unsubscribe();
  }
}
