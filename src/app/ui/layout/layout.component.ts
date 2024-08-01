import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    @if (localStorageToken) {
    <app-header></app-header>
    <main class="flex-shrink-0">
      <router-outlet></router-outlet>
    </main>
    <footer class="mt-auto">
      <app-footer></app-footer>
    </footer>
    } @else {
    <router-outlet></router-outlet>

    }
  `,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  host: {
    class: 'container d-flex flex-column h-100 w-100',
  },
})
export class LayoutComponent {
  get localStorageToken() {
    return localStorage.getItem('token');
  }
  constructor() {}
}
