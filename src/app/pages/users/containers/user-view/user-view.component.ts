import { Component } from '@angular/core';

@Component({
  selector: 'app-user-view',
  standalone: true,
  templateUrl: './user-view.component.html',
  host: {
    class: 'row w-100 h-50 position-relative',
  },
})
export class UserViewComponent {
  constructor() {}
}
