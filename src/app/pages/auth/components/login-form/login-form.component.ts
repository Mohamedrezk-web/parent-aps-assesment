import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginFormControls, LoginFormValue } from '@app/pages/auth/models';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',

  imports: [ReactiveFormsModule, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  loginFormGroup!: FormGroup<LoginFormControls>;
  submitted: boolean = false;

  loading = input(false);
  @Output() onSubmit = new EventEmitter<LoginFormValue>();

  get formControls() {
    return this.loginFormGroup.controls;
  }

  constructor() {}

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm(
    initValue: LoginFormValue = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    }
  ) {
    this.loginFormGroup = new FormGroup<LoginFormControls>({
      email: new FormControl(initValue.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(initValue.password, [Validators.required]),
    });
  }

  submitFormValue() {
    this.submitted = true;
    const { valid } = this.loginFormGroup;
    if (!valid) return;
    this.onSubmit.emit(this.loginFormGroup.getRawValue());
  }
}
