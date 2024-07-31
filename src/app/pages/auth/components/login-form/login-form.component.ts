import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() onSubmit = new EventEmitter<LoginFormValue>();

  constructor() {}

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm(
    initValue: LoginFormValue = {
      email: null,
      password: null,
    }
  ) {
    this.loginFormGroup = new FormGroup<LoginFormControls>({
      email: new FormControl(initValue.email),
      password: new FormControl(initValue.password),
    });
  }

  submitFormValue() {
    const value = this.loginFormGroup.getRawValue();

    this.onSubmit.emit(value);
  }
}
