import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-view',
  standalone: true,
  template: `
    <div
      class="col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center align-items-center py-1"
    >
      <ng-content select="[left-view]"> </ng-content>
    </div>
    <div
      class="col-sm-12 col-md-12 col-lg-8 py-3 d-flex flex-column justify-content-center"
    >
      <ng-content select="[right-view]"> </ng-content>
    </div>
    <div class="position-absolute w-100 pb-3 lift-0 btm--45">
      <ng-content select="[lift-view]"> </ng-content>
    </div>
  `,
  host: {
    class: 'row w-100 h-100 position-relative',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserViewComponent {
  constructor() {}
}
