import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '@app/pages/auth/components';
import { LoginFormValue } from '@app/pages/auth/models';

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
  constructor() {}

  ngOnInit() {}

  login(value: LoginFormValue) {
    if (!value) return;
    console.log(value);
  }
}
