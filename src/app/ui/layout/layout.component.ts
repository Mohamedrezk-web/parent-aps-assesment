import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    @if (localStorageToken) {
    <app-header></app-header>
    <main
      class="container d-flex  px-2 justify-content-center align-items-center"
    >
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    } @else {
    <router-outlet></router-outlet>

    }
  `,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  host: {
    class: ' d-flex flex-column w-100 h-100',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  get localStorageToken() {
    return localStorage.getItem('token');
  }
  constructor() {}
}
