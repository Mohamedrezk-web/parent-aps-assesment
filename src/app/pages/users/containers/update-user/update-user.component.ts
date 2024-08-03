import { Component } from '@angular/core';

import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  template: ` <app-user-form></app-user-form> `,
  host: {
    class: 'w-100 h-100 d-flex justify-content-center align-items-center',
  },
  imports: [UserFormComponent],
})
export class UpdateUserComponent {
  constructor() {}
}
