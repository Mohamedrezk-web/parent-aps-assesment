import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from '@app/pages/auth/components';
import { LoginFormValue } from '@app/pages/auth/models';
import { LoginService } from '@app/pages/auth/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="col-lg-4 col-md-6 col-sm-6 m-auto">
      <div class="card shadow">
        <div class="card-title text-center border-bottom">
          <h2 class="p-3">Login</h2>
        </div>
        <div class="card-body">
          <app-login-form
            [loading]="_loginService.loading()"
            (onSubmit)="login($event)"
          ></app-login-form>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'w100 h-100 d-flex justify-content-center ',
  },
  imports: [LoginFormComponent],
})
export class LoginComponent implements OnInit {
  readonly _loginService: LoginService = inject(LoginService);
  constructor() {}

  ngOnInit() {}

  login(value: LoginFormValue) {
    if (!value) return;
    this._loginService.login(value).subscribe();
  }
}
