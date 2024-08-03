import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from './services/users.service';
import { Observable } from 'rxjs';
import { GetUsersApiResponse } from './models/users.model';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import { LoaderComponent } from '@app/shared/components/loader.component';
import { RouterLink } from '@angular/router';

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
  providers: [UsersService],
})
export class UsersComponent implements OnInit {
  activePageIndex = signal(1);
  private _usersService: UsersService = inject(UsersService);
  user$: Observable<GetUsersApiResponse> = this._usersService.getAll(1);

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
}
