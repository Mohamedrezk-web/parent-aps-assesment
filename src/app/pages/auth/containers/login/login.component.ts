import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '@app/pages/auth/components';
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

  login(value: any) {
    console.log(value);
  }
}
