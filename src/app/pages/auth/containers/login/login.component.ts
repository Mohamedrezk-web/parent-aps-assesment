import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from '@app/pages/auth/components';
import { LoginFormValue } from '@app/pages/auth/models';
import { LoginService } from '@app/pages/auth/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  host: {
    class: 'w100 h-100 d-flex justify-content-center ',
  },
  imports: [LoginFormComponent],
})
export class LoginComponent implements OnInit {
  _loginService: LoginService = inject(LoginService);
  constructor() {}

  ngOnInit() {}

  login(value: LoginFormValue) {
    if (!value) return;
    this._loginService.login(value).subscribe();
  }
}
