import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '@app/pages/auth/services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <nav class="navbar navbar-dark bg-dark p-3">
      <a class="navbar-brand"> Assessment </a>
      <div class="mr-auto"></div>
      <div class="navbar-expand">
        <div class="navbar-nav">
          <a class="btn btn-secondary" (click)="logout()">Log Out</a>
        </div>
      </div>
    </nav>
  `,
  host: {
    class: 'd-block z-1',
  },
})
export class HeaderComponent implements OnInit {
  private readonly _loginService: LoginService = inject(LoginService);
  ngOnInit(): void {}

  logout() {
    this._loginService.logout();
  }
}
