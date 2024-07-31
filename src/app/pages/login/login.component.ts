import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginFormControls, LoginFormValue } from './login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  host: {
    class: 'w100 h-100 d-flex justify-content-center ',
  },
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup<LoginFormControls>;

  constructor() {}

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm(
    initValue: LoginFormValue = {
      user: null,
      password: null,
      shouldRememberUser: false,
    }
  ) {
    this.loginFormGroup = new FormGroup<LoginFormControls>({
      user: new FormControl(initValue.user),
      password: new FormControl(initValue.password),
      shouldRememberUser: new FormControl(initValue.shouldRememberUser),
    });
  }

  login() {
    const { valid, value } = this.loginFormGroup;

    console.log(value);
  }
}
