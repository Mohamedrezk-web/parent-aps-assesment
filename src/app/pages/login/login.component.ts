import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  host: {
    class: 'w100 h-100 d-flex justify-content-center ',
  },
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  login() {
    console.log('login');
  }
}
