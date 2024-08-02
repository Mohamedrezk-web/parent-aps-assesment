import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="spinner-border spinner text-primary" role="status"></div>
    <div class="d-flex flex-column align-items-center  gap-2">
      <h1>Loading...</h1>
      <p class="text-secondary">
        please wait until we get <ng-content></ng-content>
      </p>
    </div>
  `,
  imports: [],
  host: {
    class:
      'd-flex flex-column align-items-center justify-content-center gap-4 h-100 w-100',
  },
  styles: `
  .spinner {
    width: 3rem;
    height: 3rem;
  }
  `,
})
export class LoaderComponent {}
