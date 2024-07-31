import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginFormControls, LoginFormValue } from '@app/pages/auth/models';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',

  imports: [ReactiveFormsModule],
})
export class LoginFormComponent implements OnInit {
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

  submitFormValue() {
    const { valid, value } = this.loginFormGroup;

    console.log(value);
  }
}
